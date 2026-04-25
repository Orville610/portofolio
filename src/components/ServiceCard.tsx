import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { DynamicIcon } from "./DynamicIcon";
import type { Service } from "@/sanity/types";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      className="group grid gap-5 rounded-[2rem] border border-white/[0.08] bg-surface/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-orange/[0.45] hover:shadow-[0_0_45px_rgba(255,106,61,0.14)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
      href="/services"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-orange transition duration-300 group-hover:bg-orange group-hover:text-white">
        <DynamicIcon className="size-6" name={service.icon} />
      </span>
      <span>
        <span className="block text-xl font-black text-white">{service.title}</span>
        <span className="mt-2 block leading-7 text-muted">{service.shortDescription}</span>
      </span>
      <span className="flex size-11 items-center justify-center rounded-full border border-white/10 text-muted transition duration-300 group-hover:border-orange group-hover:text-orange">
        <ArrowUpRight className="size-5" aria-hidden="true" />
      </span>
    </Link>
  );
}
