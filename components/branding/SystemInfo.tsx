import { Palette, FileText, Layout } from "lucide-react";
// Component for displaying system information

export function SystemInfo() {
  return (
    <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 space-y-4">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
        System Components
      </h3>
      <ul className="space-y-3">
        <li className="flex gap-3 items-center">
          <Palette className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-muted-foreground">Semantic Color Palettes</span>
        </li>
        <li className="flex gap-3 items-center">
          <FileText className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-muted-foreground">Typography & Hierarchy</span>
        </li>
        <li className="flex gap-3 items-center">
          <Layout className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-muted-foreground">Grid & Spacer Systems</span>
        </li>
      </ul>
    </div>
  );
}
