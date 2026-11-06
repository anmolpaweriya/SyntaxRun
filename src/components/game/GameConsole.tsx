'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Terminal, AlertTriangle, AlertCircle, Info, Trash2 } from 'lucide-react';

export const GameConsole: React.FC = () => {
  const { levelState, executionResult } = useGameStore();

  const logs = levelState?.logs || [];
  const error = executionResult?.error;

  return (
    <div className="flex flex-col h-full bg-[#0D1117] text-slate-300 font-mono text-xs select-text overflow-hidden">
      {/* Console Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold text-[11px] uppercase tracking-wider">Console Output</span>
          <span className="bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded text-[10px]">
            {logs.length}
          </span>
        </div>
      </div>

      {/* Logs View Area */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto font-mono text-xs">
        {logs.length === 0 && !error && (
          <div className="text-slate-500 italic py-4 text-center">
            Run your code or use console.log() to see live outputs here.
          </div>
        )}

        {/* Runtime/Syntax Error Box */}
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-lg text-red-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>{error.name}: {error.message}</span>
              {error.line && <span className="text-xs bg-red-900/60 px-1.5 rounded">Line {error.line}</span>}
            </div>
            <div className="text-xs text-red-200/90 whitespace-pre-wrap leading-relaxed mt-1">
              {error.friendlyExplanation}
            </div>
          </div>
        )}

        {/* Console Log Items */}
        {logs.map((log) => {
          let icon = <Info className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />;
          let textClass = 'text-slate-200';

          if (log.type === 'warn') {
            icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />;
            textClass = 'text-amber-200';
          } else if (log.type === 'error') {
            icon = <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />;
            textClass = 'text-red-300';
          }

          return (
            <div key={log.id} className="flex items-start gap-2 py-0.5">
              {icon}
              <span className={`break-words leading-relaxed ${textClass}`}>
                {log.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

