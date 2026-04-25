import {
  Braces,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers,
  Layout,
  Mail,
  Monitor,
  Palette,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  braces: Braces,
  code: Code2,
  database: Database,
  figma: Palette,
  github: GitBranch,
  globe: Globe,
  layers: Layers,
  layout: Layout,
  linkedin: Globe,
  mail: Mail,
  monitor: Monitor,
  palette: Palette,
  pen: PenTool,
  sparkles: Sparkles,
};

type DynamicIconProps = {
  name?: string;
  className?: string;
};

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = iconMap[name ?? "sparkles"] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
