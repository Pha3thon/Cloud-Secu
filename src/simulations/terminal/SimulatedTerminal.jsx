/**
 * Simulated Linux CLI Terminal
 * CDAC Cloud Security Training Platform
 * Pure simulation against in-memory virtual filesystem and process state.
 */

// TODO: replace simulated terminal with real sandboxed VM shell

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from 'lucide-react';
import { executeCommand } from './commandEngine';

export const SimulatedTerminal = ({
  onClose,
  onMaximize,
  isMaximized,
  vfs,
  onUpdateVfs,
  labId = 'lab1',
  recordLabEvent = null
}) => {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Linux kali 6.1.0-kali7-amd64 #1 SMP PREEMPT_DYNAMIC Debian x86_64 GNU/Linux\nType "help" for a list of available lab commands.'
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever output updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on initial mount or when clicked
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const getPrompt = () => {
    const user = vfs?.currentUser || 'trainee';
    const homeDir = `/home/${user}`;
    const dir = vfs?.currentDir || homeDir;
    const displayDir = dir === homeDir ? '~' : (dir.startsWith(homeDir + '/') ? '~' + dir.slice(homeDir.length) : dir);
    return `${user}@kali:${displayDir}$ `;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = currentInput;
    setCurrentInput('');
    setHistoryIndex(-1);

    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
    }

    const promptText = getPrompt();
    const { output, nextVfs, clearScreen } = executeCommand(cmd, vfs, labId, recordLabEvent);

    if (onUpdateVfs && nextVfs) {
      onUpdateVfs(nextVfs);
    }

    if (clearScreen) {
      setHistory([]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', prompt: promptText, text: cmd },
      ...output.map((line) => ({ type: 'output', text: line }))
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setCurrentInput(commandHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput('');
      } else {
        setHistoryIndex(nextIdx);
        setCurrentInput(commandHistory[nextIdx] || '');
      }
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      style={{
        position: 'absolute',
        top: isMaximized ? 0 : '30px',
        left: isMaximized ? 0 : '60px',
        right: isMaximized ? 0 : '60px',
        bottom: isMaximized ? 0 : '30px',
        backgroundColor: '#090d16',
        borderRadius: isMaximized ? 0 : '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #1e293b',
        zIndex: 50,
        fontFamily: 'monospace'
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          height: '34px',
          backgroundColor: '#0f172a',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderBottom: '1px solid #1e293b',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TerminalIcon size={14} color="#38bdf8" />
          <span style={{ fontSize: '12px', fontWeight: '700' }}>{vfs?.currentUser || 'trainee'}@kali: ~</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setHistory([])}
            style={{ color: '#94a3b8', background: 'none', border: '1px solid #334155', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}
            title="Clear terminal screen"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => {
              setHistory((prev) => [
                ...prev,
                { type: 'input', prompt: getPrompt(), text: 'help' },
                { type: 'output', text: 'Available commands in this lab session: pwd, ls [-la], cd, cat, chmod, grep, ps [aux]' }
              ]);
            }}
            style={{ color: '#94a3b8', background: 'none', border: '1px solid #334155', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}
            title="Show available commands"
          >
            Help
          </button>
          <span
            title="Not needed in this lab"
            style={{ color: '#475569', fontSize: '11px', padding: '2px 6px', border: '1px solid #1e293b', borderRadius: '4px', cursor: 'not-allowed', opacity: 0.5 }}
          >
            Network Tools
          </span>
          <button
            type="button"
            onClick={onMaximize}
            style={{ color: '#94a3b8', background: 'none', border: 'none', padding: '4px', cursor: 'pointer' }}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ color: '#ef4444', background: 'none', border: 'none', padding: '4px', cursor: 'pointer' }}
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Console Output Scroll Area */}
      <div
        style={{
          flex: 1,
          padding: '14px 16px',
          overflowY: 'auto',
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#e2e8f0',
          cursor: 'text',
          userSelect: 'text'
        }}
      >
        {history.map((item, index) => {
          if (item.type === 'system') {
            return (
              <div key={index} style={{ color: '#64748b', marginBottom: '8px', whiteSpace: 'pre-wrap', userSelect: 'text' }}>
                {item.text}
              </div>
            );
          }
          if (item.type === 'input') {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                <span style={{ color: '#38bdf8', fontWeight: '700', userSelect: 'none' }}>{item.prompt}</span>
                <span style={{ color: '#f8fafc', userSelect: 'text' }}>{item.text}</span>
              </div>
            );
          }
          return (
            <div key={index} style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap', wordBreak: 'break-all', userSelect: 'text' }}>
              {item.text}
            </div>
          );
        })}

        {/* Active Input Line */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
          <label htmlFor="terminal-input" style={{ color: '#38bdf8', fontWeight: '700', flexShrink: 0 }}>
            {getPrompt()}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '13px',
              fontFamily: 'monospace',
              padding: 0,
              margin: 0
            }}
          />
        </form>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default SimulatedTerminal;
