"use client";

import React from "react";
import Squares from "./reactbits/Squares";

export default function ShaderBackground() {
  return (
    <Squares
      direction="diagonal"
      speed={0.35}
      squareSize={45}
      borderColor="rgba(255, 255, 255, 0.04)"
      hoverFillColor="rgba(229, 9, 20, 0.14)"
    />
  );
}
