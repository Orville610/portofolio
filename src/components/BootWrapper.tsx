"use client";

import React, { useState, useEffect } from "react";
import type { PhantomUiAttributes } from "@aejkatappaja/phantom-ui";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'phantom-ui': PhantomUiAttributes;
    }
  }
}

export default function BootWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dynamic import to load the Custom Element only in the browser (client-side)
    import("@aejkatappaja/phantom-ui").catch((err) => {
      console.error("Failed to load phantom-ui:", err);
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "💤 SYS.STATUS: SLEEP";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <phantom-ui loading={isLoading} class="block w-full">
      {children}
    </phantom-ui>
  );
}
