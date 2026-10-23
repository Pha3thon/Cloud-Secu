/**
 * Command Whitelist per Lab
 * CDAC Cloud Security Training Platform
 * Defines allowed commands and flags per lab to prevent unauthorized execution.
 */

// Known out-of-scope real Linux tools that students might try by habit
const OUT_OF_SCOPE_COMMANDS = new Set([
  'rm',
  'sudo',
  'curl',
  'wget',
  'ssh',
  'python',
  'python3',
  'vim',
  'nano',
  'kill',
  'killall',
  'top',
  'htop',
  'nc',
  'netcat',
  'nmap',
  'ifconfig',
  'ip',
  'systemctl',
  'service',
  'find',
  'su',
  'mkdir',
  'touch',
  'cp',
  'mv',
  'chown',
  'head',
  'tail',
  'less',
  'more',
  'echo',
  'clear',
  'whoami',
  'id',
  'help'
]);

export const COMMAND_WHITELISTS = {
  'm1-lab1': {
    allowedCommands: ['pwd', 'ls', 'cd', 'cat', 'chmod', 'grep', 'ps'],
    allowedFlags: {
      ls: ['-l', '-a', '-la', '-al'],
      ps: ['aux', '-aux']
    },
    pipeAllowed: true // between ps aux and grep
  },
  'm1-lab2': {
    allowedCommands: ['pwd', 'ls', 'cd', 'cat', 'chmod', 'grep', 'ps', 'dig'],
    allowedFlags: {
      ls: ['-l', '-a', '-la', '-al'],
      ps: ['aux', '-aux']
    },
    pipeAllowed: true
  },
  default: {
    allowedCommands: ['pwd', 'ls', 'cd', 'cat', 'chmod', 'grep', 'ps', 'dig'],
    allowedFlags: {
      ls: ['-l', '-a', '-la', '-al'],
      ps: ['aux', '-aux']
    },
    pipeAllowed: true
  }
};

/**
 * Checks whether a given base command is allowed for a lab.
 */
export const checkCommandAllowed = (labId, baseCommand) => {
  const normLab = (labId || 'm1-lab1').toLowerCase();
  const config = COMMAND_WHITELISTS[normLab] || COMMAND_WHITELISTS[normLab.replace('-', '')] || COMMAND_WHITELISTS.default;

  const cmd = (baseCommand || '').trim().toLowerCase();
  if (!cmd) return { allowed: true };

  if (config.allowedCommands.includes(cmd)) {
    return { allowed: true };
  }

  if (OUT_OF_SCOPE_COMMANDS.has(cmd)) {
    return {
      allowed: false,
      reason: 'outOfScope',
      message: `This command isn't available in this lab. Try: pwd, ls, cd, cat, chmod, grep, ps aux.`
    };
  }

  return {
    allowed: false,
    reason: 'notFound',
    message: `bash: ${baseCommand}: command not found`
  };
};

export default COMMAND_WHITELISTS;
