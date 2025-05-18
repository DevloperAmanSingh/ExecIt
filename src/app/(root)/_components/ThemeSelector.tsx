"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleOff,
  Cloud,
  Github,
  Laptop,
  Moon,
  Sun,
  Palette,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2f]/90 hover:bg-[#232334] 
        rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200 shadow-md"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Palette className="size-4 text-slate-400 group-hover:text-white transition-colors" />
        <span className="text-slate-300 group-hover:text-white transition-colors">
          {currentTheme?.label}
        </span>
        <div
          className="ml-auto size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-[#1e1e2f]/95 
            backdrop-blur-md rounded-xl border border-white/10 shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-white/10">
              <p className="text-xs font-medium text-slate-400">Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.06 }}
                className={`relative group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#262637] transition-all duration-200
                ${theme === t.id ? "bg-indigo-500/10 text-indigo-400" : "text-slate-300"}`}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                <div
                  className={`flex items-center justify-center size-8 rounded-lg transition-all duration-200
                  ${theme === t.id ? "bg-indigo-500/10 text-indigo-400" : "bg-gray-800/50 text-gray-400"}
                  group-hover:scale-110`}
                >
                  {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                </div>

                <span className="flex-1 text-left group-hover:text-white transition-colors">
                  {t.label}
                </span>

                <div
                  className="size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
                  style={{ background: t.color }}
                />

                {theme === t.id && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 border border-indigo-500/30 rounded-lg pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
