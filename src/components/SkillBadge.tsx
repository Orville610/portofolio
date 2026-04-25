import { DynamicIcon } from "./DynamicIcon";
import type { Skill } from "@/sanity/types";

type SkillBadgeProps = {
  skill: Skill;
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-orange/40 hover:bg-orange/10">
      <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.05] text-orange">
        <DynamicIcon className="size-5" name={skill.icon} />
      </span>
      <span>
        <span className="block font-bold text-white">{skill.name}</span>
        <span className="block text-xs text-muted">{skill.category}</span>
      </span>
    </div>
  );
}
