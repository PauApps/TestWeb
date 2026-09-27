import React from 'react';
import { cn } from '../../utils/cn';

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table ref={ref} className={cn('w-full text-left text-sm text-slate-600', className)} {...props}>
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

export const TableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200', className)} {...props}>
      {children}
    </thead>
  )
);
TableHead.displayName = 'TableHead';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-slate-100 bg-white', className)} {...props}>
      {children}
    </tbody>
  )
);
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, children, ...props }, ref) => (
    <tr ref={ref} className={cn('hover:bg-slate-50/70 transition-colors', className)} {...props}>
      {children}
    </tr>
  )
);
TableRow.displayName = 'TableRow';

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3.5 align-middle', className)} {...props}>
      {children}
    </td>
  )
);
TableCell.displayName = 'TableCell';

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, ...props }, ref) => (
    <th ref={ref} className={cn('px-4 py-3 align-middle font-medium', className)} {...props}>
      {children}
    </th>
  )
);
TableHeaderCell.displayName = 'TableHeaderCell';
