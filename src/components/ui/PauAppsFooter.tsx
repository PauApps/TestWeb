import React from 'react';
import { cn } from '../../utils/cn';

export interface PauAppsFooterProps {
  projectName?: string;
  className?: string;
  customText?: string;
  theme?: 'dark' | 'light';
}

export const PauAppsFooter: React.FC<PauAppsFooterProps> = ({
  projectName,
  className,
  customText,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'w-full py-4 px-4 text-center text-xs select-none transition-colors',
        isDark
          ? 'border-t border-stone-800/70 text-stone-400 bg-transparent'
          : 'border-t border-slate-200/80 text-slate-500 bg-transparent',
        className
      )}
    >
      <p className="flex items-center justify-center gap-1.5 flex-wrap leading-relaxed">
        <span className={cn('font-semibold', isDark ? 'text-stone-300' : 'text-slate-700')}>
          © PauApps
        </span>
        <span>·</span>
        <span>
          {customText ||
            (projectName
              ? `${projectName} és un projecte independent creat per PauApps.`
              : 'Projecte independent creat per PauApps.')}
        </span>
      </p>
    </div>
  );
};
