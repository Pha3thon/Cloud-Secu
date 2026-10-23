/**
 * Command Engine for Simulated Linux CLI Terminal
 * CDAC Cloud Security Training Platform
 * Pure functional execution against virtual filesystem and process table.
 * No eval, no child processes, no real filesystem access.
 */

import { checkCommandAllowed } from './commandWhitelist';

/**
 * Normalizes a virtual filesystem path given the current working directory.
 */
export const resolveVirtualPath = (currentDir, targetPath, currentUser = 'trainee') => {
  const homeDir = `/home/${currentUser}`;
  if (!targetPath || targetPath === '~') return homeDir;
  if (targetPath.startsWith('~/')) {
    targetPath = homeDir + targetPath.slice(1);
  }

  let fullPath = targetPath.startsWith('/')
    ? targetPath
    : `${currentDir === '/' ? '' : currentDir}/${targetPath}`;

  // Resolve '.' and '..'
  const parts = fullPath.split('/').filter(Boolean);
  const stack = [];
  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return '/' + stack.join('/');
};

/**
 * Converts a numeric octal mode (e.g. '640' or '777') to permission string (e.g. '-rw-r-----').
 */
export const octalToPermissionString = (mode) => {
  const map = {
    '0': '---',
    '1': '--x',
    '2': '-w-',
    '3': '-wx',
    '4': 'r--',
    '5': 'r-x',
    '6': 'rw-',
    '7': 'rwx'
  };
  const str = String(mode).slice(-3).padStart(3, '0');
  const u = map[str[0]] || 'rw-';
  const g = map[str[1]] || 'r--';
  const o = map[str[2]] || '---';
  return `-${u}${g}${o}`;
};

/**
 * Executes a single command (or piped series) against the virtual filesystem.
 */
export const executeCommand = (rawInput, vfs, labId = 'm1-lab1', recordEvent = null) => {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) {
    return { output: [], nextVfs: vfs, clearScreen: false };
  }

  // Handle pipe commands (e.g., 'ps aux | grep billing_sync')
  if (trimmed.includes('|')) {
    const segments = trimmed.split('|').map((s) => s.trim()).filter(Boolean);
    let pipedOutput = [];
    let currentVfs = vfs;

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const isPiped = i > 0;
      const res = executeSingleSegment(seg, currentVfs, labId, recordEvent, isPiped ? pipedOutput : null);
      if (res.clearScreen) {
        return res;
      }
      pipedOutput = res.output;
      currentVfs = res.nextVfs;
    }
    return { output: pipedOutput, nextVfs: currentVfs, clearScreen: false };
  }

  return executeSingleSegment(trimmed, vfs, labId, recordEvent, null);
};

/**
 * Executes a single command segment.
 */
function executeSingleSegment(cmdLine, vfs, labId, recordEvent, stdinLines = null) {
  const parts = cmdLine.split(/\s+/).filter(Boolean);
  const baseCmd = parts[0]?.toLowerCase();
  const args = parts.slice(1);
  const currentUser = vfs?.currentUser || 'trainee';
  const homeDir = `/home/${currentUser}`;

  // Check command whitelist
  const check = checkCommandAllowed(labId, baseCmd);
  if (!check.allowed) {
    return { output: [check.message], nextVfs: vfs, clearScreen: false };
  }

  const nextVfs = {
    ...vfs,
    files: { ...vfs.files }
  };

  switch (baseCmd) {
    case 'clear':
      return { output: [], nextVfs, clearScreen: true };

    case 'pwd':
      return { output: [vfs.currentDir || homeDir], nextVfs, clearScreen: false };

    case 'whoami':
      return { output: [currentUser], nextVfs, clearScreen: false };

    case 'id':
      return { output: [`uid=1000(${currentUser}) gid=1000(${currentUser}) groups=1000(${currentUser}),27(sudo),100(users)`], nextVfs, clearScreen: false };

    case 'cd': {
      const target = args[0] || '~';
      const resolved = resolveVirtualPath(vfs.currentDir, target, currentUser);
      if (vfs.directories && vfs.directories.includes(resolved)) {
        nextVfs.currentDir = resolved;
        return { output: [], nextVfs, clearScreen: false };
      }
      return { output: [`bash: cd: ${target}: No such file or directory`], nextVfs, clearScreen: false };
    }

    case 'ls': {
      let showAll = false;
      let showLong = false;
      let targetPath = null;

      for (const arg of args) {
        if (arg.startsWith('-')) {
          if (arg.includes('a')) showAll = true;
          if (arg.includes('l')) showLong = true;
        } else if (!targetPath) {
          targetPath = arg;
        }
      }

      const dirToInspect = resolveVirtualPath(vfs.currentDir, targetPath || '.', currentUser);
      const filesInDir = Object.values(nextVfs.files).filter((file) => {
        const fileDir = file.path.substring(0, file.path.lastIndexOf('/')) || '/';
        return fileDir === dirToInspect;
      });

      // Subdirectories inside this directory
      const subDirs = (vfs.directories || [])
        .filter((d) => {
          if (d === dirToInspect) return false;
          const parent = d.substring(0, d.lastIndexOf('/')) || '/';
          return parent === dirToInspect;
        })
        .map((d) => d.substring(d.lastIndexOf('/') + 1));

      const visibleFiles = filesInDir.filter((f) => showAll || !f.hidden);

      if (!showLong) {
        const names = [...subDirs.map((d) => d + '/'), ...visibleFiles.map((f) => f.name)];
        return {
          output: names.length > 0 ? [names.join('  ')] : [],
          nextVfs,
          clearScreen: false
        };
      }

      // Long format: -l or -la
      const lines = [`total ${visibleFiles.length * 4 + subDirs.length * 4}`];
      if (showAll) {
        lines.push(`drwxr-xr-x 2 ${currentUser} ${currentUser} 4096 Oct 15 08:00 .`);
        lines.push(`drwxr-xr-x 4 root    root    4096 Oct 15 08:00 ..`);
      }
      for (const d of subDirs) {
        lines.push(`drwxr-xr-x 2 ${currentUser} ${currentUser} 4096 Oct 15 08:00 ${d}`);
      }
      for (const f of visibleFiles) {
        lines.push(`${f.permissions} 1 ${f.owner.padEnd(7)} ${f.group.padEnd(7)} ${String(f.size).padStart(6)} ${f.date} ${f.name}`);
      }
      return { output: lines, nextVfs, clearScreen: false };
    }

    case 'cat': {
      if (args.length === 0) {
        return { output: ['cat: missing operand'], nextVfs, clearScreen: false };
      }
      const targetFile = args[0];
      const resolved = resolveVirtualPath(vfs.currentDir, targetFile, currentUser);
      const file = nextVfs.files[resolved];

      if (!file) {
        return { output: [`cat: ${targetFile}: No such file or directory`], nextVfs, clearScreen: false };
      }

      // Event trigger: student inspected .access_notes
      if (file.name === '.access_notes' && recordEvent) {
        recordEvent('terminal_cat_access_notes');
      }

      const contentLines = file.content.split('\n');
      if (contentLines[contentLines.length - 1] === '') {
        contentLines.pop();
      }
      return { output: contentLines, nextVfs, clearScreen: false };
    }

    case 'chmod': {
      if (args.length < 2) {
        return { output: ['chmod: missing operand'], nextVfs, clearScreen: false };
      }
      const mode = args[0];
      const targetFile = args[1];
      const resolved = resolveVirtualPath(vfs.currentDir, targetFile, currentUser);
      const file = nextVfs.files[resolved];

      if (!file) {
        return { output: [`chmod: cannot access '${targetFile}': No such file or directory`], nextVfs, clearScreen: false };
      }

      // Update permissions in virtual filesystem
      const newPermStr = octalToPermissionString(mode);
      file.mode = mode;
      file.permissions = newPermStr;

      // Event trigger: student hardened shared_report.txt to 640
      if (file.name === 'shared_report.txt' && mode === '640' && recordEvent) {
        recordEvent('terminal_chmod_640');
      }

      return { output: [], nextVfs, clearScreen: false };
    }

    case 'ps': {
      if (recordEvent) {
        recordEvent('terminal_ps_aux');
      }

      const header = 'USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND';
      const rows = (vfs.processes || []).map((p) => {
        return `${p.user.padEnd(10)} ${String(p.pid).padStart(5)} ${p.cpu.padStart(4)} ${p.mem.padStart(4)} ${p.vsz.padStart(6)} ${p.rss.padStart(5)} ${p.tty.padEnd(8)} ${p.stat.padEnd(4)} ${p.start.padEnd(7)} ${p.time.padEnd(6)} ${p.command}`;
      });

      return { output: [header, ...rows], nextVfs, clearScreen: false };
    }

    case 'grep': {
      if (args.length === 0) {
        return { output: ['Usage: grep [OPTION]... PATTERNS [FILE]...'], nextVfs, clearScreen: false };
      }
      const pattern = args[0];
      let linesToSearch = [];

      // If piped from stdin
      if (stdinLines && stdinLines.length > 0) {
        linesToSearch = stdinLines;
      } else {
        const fileArg = args[1];
        if (!fileArg) {
          return { output: ['grep: missing file operand or piped input'], nextVfs, clearScreen: false };
        }
        const resolved = resolveVirtualPath(vfs.currentDir, fileArg, currentUser);
        const file = nextVfs.files[resolved];
        if (!file) {
          return { output: [`grep: ${fileArg}: No such file or directory`], nextVfs, clearScreen: false };
        }
        linesToSearch = file.content.split('\n');
      }

      const regex = new RegExp(pattern, 'i');
      const matches = linesToSearch.filter((l) => regex.test(l));

      // Event trigger: student found FLAG in log
      if (pattern.toUpperCase().includes('FLAG') && matches.length > 0 && recordEvent) {
        recordEvent('terminal_grep_flag');
      }

      return { output: matches, nextVfs, clearScreen: false };
    }

    case 'dig': {
      if (recordEvent) {
        recordEvent('terminal_dig');
      }
      const domain = args[0] || '';
      const qtype = (args[1] || 'A').toUpperCase();

      if (domain.includes('lab01.cloudsec.training') || domain.includes('lab01')) {
        if (qtype === 'MX') {
          return {
            output: [
              '; <<>> DiG 9.18.1-1ubuntu1.3-Ubuntu <<>> lab01.cloudsec.training MX',
              ';; global options: +cmd',
              ';; Got answer:',
              ';; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 54321',
              ';; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1',
              '',
              ';; QUESTION SECTION:',
              ';lab01.cloudsec.training.\t\tIN\tMX',
              '',
              ';; ANSWER SECTION:',
              'lab01.cloudsec.training.\t300\tIN\tMX\t10 mail.lab01.cloudsec.training.',
              '',
              ';; Query time: 1 msec',
              ';; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)',
              ';; WHEN: Wed Oct 21 23:25:00 UTC 2026',
              ';; MSG SIZE  rcvd: 78'
            ],
            nextVfs,
            clearScreen: false
          };
        }

        if (recordEvent) {
          recordEvent('dig_dns_a_lookup');
        }
        return {
          output: [
            '; <<>> DiG 9.18.1-1ubuntu1.3-Ubuntu <<>> lab01.cloudsec.training A',
            ';; global options: +cmd',
            ';; Got answer:',
            ';; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 41289',
            ';; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1',
            '',
            ';; QUESTION SECTION:',
            ';lab01.cloudsec.training.\t\tIN\tA',
            '',
            ';; ANSWER SECTION:',
            'lab01.cloudsec.training.\t300\tIN\tA\t198.51.100.10',
            '',
            ';; Query time: 1 msec',
            ';; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)',
            ';; WHEN: Wed Oct 21 23:25:00 UTC 2026',
            ';; MSG SIZE  rcvd: 68'
          ],
          nextVfs,
          clearScreen: false
        };
      }

      return {
        output: [
          `; <<>> DiG 9.18.1 <<>> ${domain || 'example.com'}`,
          ';; Got answer: NXDOMAIN',
          ';; Query time: 1 msec',
          ';; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)'
        ],
        nextVfs,
        clearScreen: false
      };
    }

    default:
      return { output: [`bash: ${baseCmd}: command not found`], nextVfs, clearScreen: false };
  }
}

export default executeCommand;
