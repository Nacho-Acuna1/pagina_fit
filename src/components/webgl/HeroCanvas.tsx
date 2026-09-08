'use client';

import { useEffect, useRef } from 'react';

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamic import OGL to avoid SSR issues
    let cancelled = false;
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;
    let glRef: { canvas: HTMLCanvasElement; getExtension: (name: string) => { loseContext: () => void } | null } | null = null;

    async function init() {
      const { Renderer, Camera, Transform, Geometry, Program, Mesh } = await import('ogl');
      if (cancelled || !container) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
        antialias: true,
      });
      const gl = renderer.gl;
      glRef = gl;
      gl.clearColor(0, 0, 0, 0);
      container.appendChild(gl.canvas);

      const camera = new Camera(gl, { fov: 45 });
      camera.position.set(0, 0, 6);

      const scene = new Transform();

      // Create multiple small particles
      const particleCount = 80;
      const positions = new Float32Array(particleCount * 3);
      const randoms = new Float32Array(particleCount);
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        randoms[i] = Math.random();
      }

      const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 1, data: randoms },
      });

      const program = new Program(gl, {
        vertex: `
          attribute vec3 position;
          attribute float random;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          varying float vRandom;
          void main() {
            vRandom = random;
            vec3 pos = position;
            pos.y += sin(uTime * 0.3 + random * 6.28) * 0.3;
            pos.x += cos(uTime * 0.2 + random * 6.28) * 0.2;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = mix(3.0, 8.0, random) * (1.0 / gl_Position.w) * 100.0;
          }
        `,
        fragment: `
          precision highp float;
          varying float vRandom;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            vec3 color = mix(vec3(0.86, 0.15, 0.15), vec3(1.0, 0.27, 0.27), vRandom);
            gl_FragColor = vec4(color, alpha * mix(0.3, 0.7, vRandom));
          }
        `,
        uniforms: {
          uTime: { value: 0 },
        },
        transparent: true,
        depthTest: false,
      });

      const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
      mesh.setParent(scene);

      function handleResize() {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.perspective({ aspect: width / height });
      }

      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      handleResize();

      function update(t: number) {
        if (cancelled) return;
        animationFrameId = requestAnimationFrame(update);
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene, camera });
      }
      animationFrameId = requestAnimationFrame(update);
    }

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      if (glRef?.canvas?.parentNode) {
        glRef.canvas.parentNode.removeChild(glRef.canvas);
      }
      glRef?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-20 pointer-events-none" />;
}
