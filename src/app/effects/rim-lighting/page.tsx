"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // Signed Distance Function for a rounded rectangle
  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    // --- CONFIGURABLE PARAMETERS ---
    float rim_inset         = -0.03;    // 0.0 = at edge, positive = move inward, negative = move outward
    float corner_radius_px  = 128.0;   // Corner rounding in pixels
    float base_thickness    = 0.1;  // Minimum thickness of the rim
    float wave_amplitude    = 0.1;   // How much the "bulge" expands
    float glow_sharpness    = 3.2;    // Falloff of the glow (higher = sharper)

    float wave_speed_global = 1.8;    // Global speed multiplier for waves
    float color_cycle_speed = 0.3;    // Speed of the rainbow rotation

    float mouse_strength    = 2.5;    // Brightness boost near cursor
    float mouse_radius      = 0.35;   // Influence area of the mouse
    // -------------------------------

    // 1. Setup coordinates with aspect correction
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (vUv * 2.0 - 1.0);
    p.x *= aspect; // Correct x for aspect ratio

    // 2. Base Shape (Rounded edges)
    // Map pixels to normalized coordinates correctly
    float radius = (corner_radius_px * 2.0) / u_resolution.y; 
    vec2 size = vec2(aspect, 1.0) - rim_inset; // Adjust size by inset
    float d = sdRoundedBox(p, size, radius);

    
    // 3. Multi-layered Liquid Wave (Clockwise)
    float angle = atan(p.y, p.x); 
    float t = u_time * wave_speed_global;
    
    // Seamless integer frequencies for perfect loops
    float w1 = sin(angle * 2.0 - t * 1.5);
    float w2 = sin(angle * 5.0 - t * 2.5 + 1.2);
    float w3 = cos(angle * 1.0 + t * 0.8);
    
    float wave = (w1 * 0.5 + w2 * 0.3 + w3 * 0.2);
    float waveNorm = wave * 0.5 + 0.5; // 0.0 to 1.0
    
    // 4. Dynamic Thickness (Edge-clipping "half-rim")
    float thickness = base_thickness + wave_amplitude * waveNorm;
    float rim = 1.0 - smoothstep(0.0, thickness, abs(d));
    rim = pow(rim, glow_sharpness);

    // 5. Seamless Liquid Rainbow
    // Standard cosine rainbow: 0.5 + 0.5 * cos(6.28 * (t + color_vec))
    float hue = angle / 6.28318 + u_time * color_cycle_speed;
    vec3 color = 0.5 + 0.5 * cos(6.28318 * (hue + vec3(0.0, 0.33, 0.67)));
    
    // Boost vibrancy in the peaks
    color *= 1.3 + 0.7 * waveNorm;

    // 6. Interaction
    float mouseDist = distance(vUv, u_mouse);
    float mouseInfluence = smoothstep(mouse_radius, 0.0, mouseDist);
    
    float finalIntensity = rim * (0.8 + 1.2 * waveNorm);
    finalIntensity += mouseInfluence * rim * mouse_strength;

    gl_FragColor = vec4(color * finalIntensity, 1.0);
  }
`;

const RimQuad = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height],
  );

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.getElapsedTime();

      const targetMouseX = state.mouse.x * 0.5 + 0.5;
      const targetMouseY = state.mouse.y * 0.5 + 0.5;

      material.uniforms.u_mouse.value.x = THREE.MathUtils.lerp(
        material.uniforms.u_mouse.value.x,
        targetMouseX,
        0.1,
      );
      material.uniforms.u_mouse.value.y = THREE.MathUtils.lerp(
        material.uniforms.u_mouse.value.y,
        targetMouseY,
        0.1,
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthTest={false}
      />
    </mesh>
  );
};

export default function RimLightingPage() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <color attach="background" args={["#000"]} />
        <RimQuad />
        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0.2}
            mipmapBlur
            intensity={1.5}
            radius={0.4}
          />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-white text-4xl font-light tracking-[0.5em] opacity-80 uppercase">
          Rim Lighting
        </h1>
      </div>
    </div>
  );
}
