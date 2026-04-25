"use client";

import { Studio } from "sanity";

import config from "../../../../sanity.config";

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-white text-black">
      <Studio config={config} />
    </div>
  );
}
