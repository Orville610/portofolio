"use client";

import React, { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    // Sync WebGL size with client size
    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", syncSize);
    }
    syncSize();

    // Shaders definition
    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Adapted fragment shader to match Orville's MD3 Color Palette
    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 u_primaryColor;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          vec2 p = uv * 2.0 - 1.0;
          p.x *= u_resolution.x / u_resolution.y;

          // Interactive ripple/distortion around mouse
          float dist = distance(uv, mouse);
          float ripple = sin(dist * 20.0 - u_time * 5.0) * exp(-dist * 5.0);
          vec2 distortedUv = uv + ripple * 0.02;

          // Theme-matched colors: Primary (dynamic) and Surface (#131313)
          vec3 primaryColor = u_primaryColor; 
          vec3 backgroundColor = vec3(0.075, 0.075, 0.075); 

          // Dynamic grid pattern with distortion
          float n = noise(distortedUv * 10.0 + u_time * 0.1);
          float line = smoothstep(0.48, 0.5, abs(fract(distortedUv.y * 20.0 + n * 0.2) - 0.5));
          float lineX = smoothstep(0.48, 0.5, abs(fract(distortedUv.x * 20.0 * (u_resolution.x/u_resolution.y) - n * 0.2) - 0.5));
          
          float grid = (line + lineX) * 0.15;
          
          // Floating "cloud" particles
          float cloud = 0.0;
          for(float i = 1.0; i < 4.0; i++) {
              vec2 pos = distortedUv * (5.0 * i);
              pos += u_time * 0.05 * vec2(sin(i), cos(i));
              cloud += noise(pos) * (1.0 / i);
          }
          cloud = smoothstep(0.4, 0.7, cloud * 0.5);
          
          // Interactive Glow at mouse position
          float mouseGlow = smoothstep(0.2, 0.0, dist) * 0.3;
          
          vec3 color = mix(backgroundColor, primaryColor, grid + cloud * 0.1 + mouseGlow);
          
          // Vignette
          float vignette = 1.0 - smoothstep(0.5, 1.5, length(p));
          color *= vignette;

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Helper functions for compilation
    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const prog = gl.createProgram();
    if (!prog) return;

    const vsCompiled = compileShader(gl.VERTEX_SHADER, vs);
    const fsCompiled = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vsCompiled || !fsCompiled) return;

    gl.attachShader(prog, vsCompiled);
    gl.attachShader(prog, fsCompiled);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uPrimaryColor = gl.getUniformLocation(prog, "u_primaryColor");

    // Extract primary color from CSS variables
    let r = 1.0, g = 0.231, b = 0.188; // Default fallback to vibrant red
    try {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryRgbStr = computedStyle.getPropertyValue("--primary-rgb").trim();
      if (primaryRgbStr) {
        const parts = primaryRgbStr.split(",").map(num => parseFloat(num.trim()) / 255);
        if (parts.length === 3 && parts.every(num => !isNaN(num))) {
          [r, g, b] = parts;
        }
      }
    } catch (e) {
      console.error("Failed to read --primary-rgb from CSS:", e);
    }

    // Track mouse position globally
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      // Avoid calling getBoundingClientRect() which triggers forced reflows.
      // Since the canvas is fixed-positioned and spans the entire viewport, we can use window dimensions directly.
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w && h) {
        const nx = event.clientX / w;
        const ny = 1.0 - (event.clientY / h);
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      if (uPrimaryColor) gl.uniform3f(uPrimaryColor, r, g, b);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", syncSize);
      }
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vsCompiled);
      gl.deleteShader(fsCompiled);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-60 pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
