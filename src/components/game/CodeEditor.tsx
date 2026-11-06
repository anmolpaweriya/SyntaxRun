'use client';

import React, { useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useGameStore } from '@/store/useGameStore';
import { Play, Pause, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const CodeEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const {
    userCode,
    setUserCode,
    runCode,
    pauseExecution,
    resumeExecution,
    resetLevel,
    isRunning,
    isPaused,
    playbackSpeed,
    setPlaybackSpeed,
    highlightedLine,
    currentLevel,
    progress,
  } = useGameStore();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Register autocompletions for SyntaxRun game API
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: 'moveRight',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'moveRight(${1:1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Moves character right by specified number of tiles (default 1).',
          },
          {
            label: 'moveLeft',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'moveLeft(${1:1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Moves character left by specified number of tiles (default 1).',
          },
          {
            label: 'moveUp',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'moveUp(${1:1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Moves character up by specified number of tiles (default 1).',
          },
          {
            label: 'moveDown',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'moveDown(${1:1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Moves character down by specified number of tiles (default 1).',
          },
          {
            label: 'collectCoin',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'collectCoin();',
            documentation: 'Collects coin, gem, or key on the current tile.',
          },
          {
            label: 'openDoor',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'openDoor();',
            documentation: 'Unlocks and opens an adjacent locked door.',
          },
          {
            label: 'toggleSwitch',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'toggleSwitch();',
            documentation: 'Toggles a floor switch on/off.',
          },
          {
            label: 'hasKey',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'hasKey()',
            documentation: 'Returns true if player currently holds a key.',
          },
          {
            label: 'isPathClear',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'isPathClear()',
            documentation: 'Returns true if the tile directly ahead is passable.',
          },
          {
            label: 'setSpeed',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'setSpeed(${1:2});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Sets player walk speed multiplier.',
          },
          {
            label: 'attack',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'attack();',
            documentation: 'Performs physical melee attack against adjacent enemy or boss.',
          },
          {
            label: 'castSpell',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'castSpell("${1:fireball}");',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Casts spell at target.',
          },
        ];

        return { suggestions };
      },
    });
  };

  // Update line highlighting during execution
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    if (highlightedLine) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [
        {
          range: new monacoRef.current.Range(highlightedLine, 1, highlightedLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-amber-500/20 border-l-4 border-amber-400',
            glyphMarginClassName: 'text-amber-400',
          },
        },
      ]);
    } else {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  }, [highlightedLine]);

  const handleResetToStarting = () => {
    if (currentLevel) {
      setUserCode(currentLevel.startingCode);
      resetLevel();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1E1E1E] border-l border-slate-800">
      {/* Editor Control Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          {/* Main Run / Pause Button */}
          {!isRunning ? (
            <button
              onClick={runCode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-semibold shadow-glow-forest transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Code</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeExecution}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-md font-semibold transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={pauseExecution}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-md font-semibold transition-all"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          )}

          {/* Reset Button */}
          <button
            onClick={resetLevel}
            disabled={isRunning && !isPaused}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors disabled:opacity-50"
            title="Reset hero to starting position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset State</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md text-slate-300 ml-2">
            <Zap className="w-3 h-3 text-amber-400" />
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-transparent border-none text-xs focus:ring-0 cursor-pointer text-slate-200"
            >
              <option value={0.5} className="bg-slate-900">0.5x Speed</option>
              <option value={1} className="bg-slate-900">1.0x Speed</option>
              <option value={2} className="bg-slate-900">2.0x Speed</option>
              <option value={4} className="bg-slate-900">4.0x Speed</option>
              <option value={10} className="bg-slate-900">Instant</option>
            </select>
          </div>
        </div>

        {/* Reset Code to Template button */}
        <button
          onClick={handleResetToStarting}
          className="text-slate-400 hover:text-amber-400 text-xs flex items-center gap-1 transition-colors"
          title="Reset editor to level default starter code"
        >
          <Sparkles className="w-3 h-3" />
          <span>Reset Code</span>
        </button>
      </div>

      {/* Monaco Code Editor Area */}
      <div className="flex-1 w-full relative">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme={progress.settings.editorTheme || 'vs-dark'}
          value={userCode}
          onChange={(val) => setUserCode(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: progress.settings.editorFontSize || 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 12, bottom: 12 },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
};

