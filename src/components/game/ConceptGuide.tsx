'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { BookOpen, Copy, Check, Lightbulb } from 'lucide-react';

export const ConceptGuide: React.FC = () => {
  const { currentLevel } = useGameStore();
  const [copied, setCopied] = useState(false);

  if (!currentLevel) return null;

  const concept = currentLevel.concept;

  const handleCopy = () => {
    navigator.clipboard.writeText(concept.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 space-y-4 text-sm text-slate-300 overflow-y-auto max-h-full">
      {/* Concept Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <BookOpen className="w-4 h-4 text-sky-400" />
        <h3 className="font-semibold text-slate-100 text-sm">{concept.topic}</h3>
      </div>

      {/* Summary */}
      <p className="text-xs text-slate-300 leading-relaxed font-medium">
        {concept.summary}
      </p>

      {/* Detailed explanation */}
      <p className="text-xs text-slate-400 leading-relaxed">
        {concept.explanation}
      </p>

      {/* Code Snippet Box */}
      <div className="relative group rounded-lg overflow-hidden border border-slate-700/80 bg-[#141B2D]">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/60 text-[11px] text-slate-400 font-mono">
          <span>JavaScript Example</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-sky-400 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
          {concept.codeSnippet}
        </pre>
      </div>

      {/* Pro Tips */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Pro Tips</span>
        </div>
        <ul className="space-y-1.5">
          {concept.tips.map((tip, idx) => (
            <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

