'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// ─── Canvas icon drawing ─────────────────────────────────────────────────────

const TEX = 128;
const C   = TEX / 2;

function base(ctx: CanvasRenderingContext2D, glow = GLOW, lw = 5) {
  ctx.clearRect(0, 0, TEX, TEX);
  ctx.strokeStyle = INK;
  ctx.fillStyle   = FILL;
  ctx.lineWidth   = lw;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.shadowColor = glow;
  ctx.shadowBlur  = 22;
}

const INK  = '#D4CAFF';
const FILL = 'rgba(180,160,255,0.14)';
const GLOW = '#7C3AED';

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);      ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// 💼 Briefcase — executive / business
function drawBriefcase(ctx: CanvasRenderingContext2D) {
  base(ctx);
  rr(ctx, 14, 44, 100, 68, 9);
  ctx.fill(); ctx.stroke();
  // handle
  ctx.beginPath();
  ctx.moveTo(44, 44); ctx.lineTo(44, 30);
  ctx.quadraticCurveTo(44, 20, C, 20);
  ctx.quadraticCurveTo(84, 20, 84, 30); ctx.lineTo(84, 44);
  ctx.stroke();
  // divider
  ctx.beginPath(); ctx.moveTo(14, 68); ctx.lineTo(114, 68); ctx.stroke();
  // clasp
  ctx.fillStyle = INK; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(C, 68, 5, 0, Math.PI * 2); ctx.fill();
}

// 👑 Crown — leadership / authority
function drawCrown(ctx: CanvasRenderingContext2D) {
  base(ctx);
  ctx.beginPath();
  ctx.moveTo(12, 96);
  ctx.lineTo(12, 52); ctx.lineTo(36, 72);
  ctx.lineTo(C,  20); ctx.lineTo(92, 72);
  ctx.lineTo(116, 52); ctx.lineTo(116, 96);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  // gem dots on each peak
  ctx.fillStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 14;
  [[C, 20], [36, 72], [92, 72]].forEach(([x, y]) => {
    ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI * 2); ctx.fill();
  });
}

// 🚀 Rocket — startup / launch / innovation
function drawRocket(ctx: CanvasRenderingContext2D) {
  base(ctx);
  // body
  ctx.beginPath();
  ctx.moveTo(C, 12);
  ctx.bezierCurveTo(86, 24, 88, 52, 86, 76);
  ctx.lineTo(42, 76);
  ctx.bezierCurveTo(40, 52, 42, 24, C, 12);
  ctx.fill(); ctx.stroke();
  // left fin
  ctx.beginPath();
  ctx.moveTo(42, 60); ctx.lineTo(20, 88); ctx.lineTo(42, 82); ctx.closePath();
  ctx.fill(); ctx.stroke();
  // right fin
  ctx.beginPath();
  ctx.moveTo(86, 60); ctx.lineTo(108, 88); ctx.lineTo(86, 82); ctx.closePath();
  ctx.fill(); ctx.stroke();
  // porthole
  ctx.fillStyle = 'rgba(220,210,255,0.35)';
  ctx.strokeStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 10; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(C, 46, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // flame
  ctx.fillStyle = 'rgba(180,140,255,0.45)';
  ctx.strokeStyle = INK; ctx.shadowColor = GLOW; ctx.shadowBlur = 20; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(50, 76);
  ctx.bezierCurveTo(50, 100, 58, 112, C, 110);
  ctx.bezierCurveTo(70, 112, 78, 100, 78, 76);
  ctx.fill(); ctx.stroke();
}

// 💡 Lightbulb — vision / idea / innovation
function drawLightbulb(ctx: CanvasRenderingContext2D) {
  base(ctx);
  // bulb
  ctx.beginPath(); ctx.arc(C, 46, 34, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // base rungs
  ctx.shadowBlur = 10;
  [[46, 82, 82, 82], [50, 93, 78, 93], [54, 104, 74, 104]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });
  // inner glow orb
  ctx.fillStyle = 'rgba(255,255,230,0.28)';
  ctx.shadowColor = '#ffffcc'; ctx.shadowBlur = 20;
  ctx.beginPath(); ctx.arc(C, 44, 18, 0, Math.PI * 2); ctx.fill();
}

// 📈 Bar chart — growth / performance / metrics
function drawChart(ctx: CanvasRenderingContext2D) {
  base(ctx);
  // axes
  ctx.shadowBlur = 8;
  ctx.beginPath(); ctx.moveTo(18, 110); ctx.lineTo(18, 16); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(18, 110); ctx.lineTo(118, 110); ctx.stroke();
  // bars
  [[22, 38, 22], [54, 58, 22], [86, 80, 22]].forEach(([x, h, w]) => {
    ctx.fillStyle = 'rgba(180,160,255,0.22)'; ctx.shadowBlur = 14;
    rr(ctx, x, 110 - h, w, h, 3); ctx.fill(); ctx.stroke();
  });
  // trend line + arrow
  ctx.strokeStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 16; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(22, 84); ctx.lineTo(98, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(82, 24); ctx.lineTo(98, 30); ctx.lineTo(92, 46); ctx.stroke();
}

// 🌐 Globe — global reach / scale
function drawGlobe(ctx: CanvasRenderingContext2D) {
  base(ctx);
  ctx.shadowBlur = 18;
  // outer circle
  ctx.beginPath(); ctx.arc(C, C, 44, 0, Math.PI * 2); ctx.stroke();
  // equator
  ctx.beginPath(); ctx.ellipse(C, C, 44, 13, 0, 0, Math.PI * 2); ctx.stroke();
  // vertical meridian
  ctx.beginPath(); ctx.ellipse(C, C, 20, 44, 0, 0, Math.PI * 2); ctx.stroke();
  // latitude lines
  [40, 88].forEach(y => {
    const ry = Math.abs(y - C);
    const rx = Math.sqrt(44 * 44 - ry * ry);
    ctx.beginPath(); ctx.ellipse(C, y, rx, 9, 0, 0, Math.PI * 2); ctx.stroke();
  });
}

// 🏆 Trophy — achievement / excellence
function drawTrophy(ctx: CanvasRenderingContext2D) {
  base(ctx);
  // cup bowl
  ctx.beginPath();
  ctx.moveTo(30, 22); ctx.lineTo(98, 22);
  ctx.bezierCurveTo(98, 70, 78, 82, C, 84);
  ctx.bezierCurveTo(50, 82, 30, 70, 30, 22);
  ctx.fill(); ctx.stroke();
  // handles
  ctx.beginPath(); ctx.moveTo(30, 30); ctx.bezierCurveTo(14, 30, 14, 56, 30, 56); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(98, 30); ctx.bezierCurveTo(114, 30, 114, 56, 98, 56); ctx.stroke();
  // stem
  ctx.beginPath(); ctx.moveTo(C, 84); ctx.lineTo(C, 102); ctx.stroke();
  // base
  rr(ctx, 40, 102, 48, 12, 4); ctx.fill(); ctx.stroke();
  // star on cup
  ctx.fillStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.arc(C, 50, 6, 0, Math.PI * 2); ctx.fill();
}

// 🎯 Target — goals / focus / precision
function drawTarget(ctx: CanvasRenderingContext2D) {
  base(ctx);
  ctx.shadowBlur = 16;
  [44, 30, 16].forEach((r, i) => {
    ctx.globalAlpha = 0.4 + i * 0.25;
    ctx.beginPath(); ctx.arc(C, C, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
  // crosshair lines
  [[C - 50, C, C - 50 + 24, C], [C + 26, C, C + 50, C],
   [C, C - 50, C, C - 50 + 24], [C, C + 26, C, C + 50]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });
  // center dot
  ctx.fillStyle = INK; ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.arc(C, C, 5, 0, Math.PI * 2); ctx.fill();
}

type DrawFn = (ctx: CanvasRenderingContext2D) => void;
// 8 icons for 6 nodes — always 2 unused so uniqueness is always achievable
const ICON_DRAWS: DrawFn[] = [
  drawBriefcase, drawCrown, drawRocket, drawLightbulb,
  drawChart, drawGlobe, drawTrophy, drawTarget,
];
const N_ICONS = ICON_DRAWS.length;

function makeTextures() {
  return ICON_DRAWS.map(draw => {
    const canvas = document.createElement('canvas');
    canvas.width = TEX; canvas.height = TEX;
    const ctx = canvas.getContext('2d')!;
    draw(ctx);
    return new THREE.CanvasTexture(canvas);
  });
}

// ─── Orbital params ───────────────────────────────────────────────────────────

const ORBITALS = [
  { r: 2.5, speed:  0.28, phase: 0.0, tilt:  0.40, size: 0.068 },
  { r: 3.0, speed: -0.20, phase: 2.1, tilt: -0.65, size: 0.052 },
  { r: 2.1, speed:  0.38, phase: 4.2, tilt:  1.10, size: 0.060 },
  { r: 3.5, speed: -0.16, phase: 1.0, tilt: -1.25, size: 0.046 },
  { r: 2.8, speed:  0.24, phase: 3.5, tilt:  0.70, size: 0.064 },
  { r: 3.8, speed: -0.18, phase: 5.5, tilt:  0.20, size: 0.042 },
];
const N = ORBITALS.length;

// smoothstep
const sm = (t: number) => t * t * (3 - 2 * t);

interface NodeState {
  form: number;
  nextSwapTime: number;
  transitioning: boolean;
  transitionProgress: number;
  nextForm: number;
  swapped: boolean;
}

// ─── Core ─────────────────────────────────────────────────────────────────────

function DigitalCore() {
  const mainRef  = useRef<THREE.Mesh>(null!);
  const wireRef  = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const glowRef  = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mainRef.current.rotation.set(t * 0.07, t * 0.12, 0);
    wireRef.current.rotation.set(t * 0.07, t * 0.12, 0);
    outerRef.current.rotation.set(t * 0.04, -t * 0.055, t * 0.02);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.22 + Math.sin(t * 1.6) * 0.14;
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color="#6E3BFF" transparent opacity={0.07} wireframe />
      </mesh>
      <mesh ref={mainRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#4B30C0" transparent opacity={0.06} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#B7A7FF" transparent opacity={0.48} wireframe />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.5}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.92} />
      </mesh>
    </group>
  );
}

// ─── Orbital icon nodes ───────────────────────────────────────────────────────

function OrbitalSystem() {
  const textures = useMemo(() => makeTextures(), []);

  const nodeGroups  = useRef<(THREE.Group  | null)[]>(Array(N).fill(null));
  const spriteRefs  = useRef<(THREE.Sprite | null)[][]>(
    Array.from({ length: N }, () => Array(N_ICONS).fill(null))
  );
  const linesRef = useRef<THREE.LineSegments>(null!);
  const lineArr  = useMemo(() => new Float32Array(N * 6), []);

  const nodeStates = useRef<NodeState[]>(
    Array.from({ length: N }, (_, i) => ({
      form: i % N_ICONS,                          // stagger starting icons
      nextSwapTime: 5 + i * 2.2 + Math.random() * 3,
      transitioning: false,
      transitionProgress: 0,
      nextForm: 0,
      swapped: false,
    }))
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    let linesDirty = false;

    ORBITALS.forEach((orb, i) => {
      // orbital position
      const a = t * orb.speed + orb.phase;
      const x = Math.cos(a) * orb.r;
      const y = Math.sin(a) * orb.r * Math.sin(orb.tilt);
      const z = Math.sin(a) * orb.r * Math.cos(orb.tilt) * 0.35;

      const grp = nodeGroups.current[i];
      if (grp) grp.position.set(x, y, z);

      // update beam vertex
      if (linesRef.current) {
        const arr = linesRef.current.geometry.attributes.position.array as Float32Array;
        arr[i * 6 + 0] = 0; arr[i * 6 + 1] = 0; arr[i * 6 + 2] = 0;
        arr[i * 6 + 3] = x; arr[i * 6 + 4] = y; arr[i * 6 + 5] = z;
        linesDirty = true;
      }

      const state   = nodeStates.current[i];
      const iconSz  = orb.size * 4;

      // kick off transition
      if (!state.transitioning && t >= state.nextSwapTime) {
        // collect icons in use by every other node (including their in-flight nextForm)
        const occupied = new Set<number>();
        nodeStates.current.forEach((s, idx) => {
          if (idx === i) return;
          occupied.add(s.form);
          if (s.transitioning) occupied.add(s.nextForm);
        });
        // candidates: icons not occupied and not the current one
        const candidates = Array.from({ length: N_ICONS }, (_, j) => j)
          .filter(j => j !== state.form && !occupied.has(j));
        if (candidates.length === 0) return; // all taken, skip this cycle
        state.nextForm = candidates[Math.floor(Math.random() * candidates.length)];
        state.transitioning = true;
        state.transitionProgress = 0;
        state.swapped = false;
      }

      if (state.transitioning) {
        state.transitionProgress = Math.min(state.transitionProgress + delta / 0.55, 1);
        const prog = state.transitionProgress;

        // swap at midpoint (once)
        if (!state.swapped && prog >= 0.5) {
          const oldSp = spriteRefs.current[i][state.form];
          const newSp = spriteRefs.current[i][state.nextForm];
          if (oldSp) { oldSp.visible = false; oldSp.scale.set(iconSz, iconSz, 1); }
          if (newSp) { newSp.visible = true;  newSp.scale.set(0, 0, 1); }
          state.form = state.nextForm;
          state.swapped = true;
        }

        const s = prog < 0.5
          ? sm(1 - prog * 2)       // ease out
          : sm((prog - 0.5) * 2);  // ease in

        const cur = spriteRefs.current[i][state.form];
        if (cur) cur.scale.set(s * iconSz, s * iconSz, 1);

        if (prog >= 1) {
          state.transitioning = false;
          if (cur) cur.scale.set(iconSz, iconSz, 1);
          state.nextSwapTime = t + 7 + Math.random() * 9;
        }
      }
    });

    if (linesDirty && linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {ORBITALS.map((orb, i) => {
        const iconSz   = orb.size * 4;
        const initForm = i % N_ICONS;
        return (
          <group
            key={i}
            ref={(el: THREE.Group | null) => { nodeGroups.current[i] = el; }}
          >
            {textures.map((tex, j) => (
              <sprite
                key={j}
                ref={(el: THREE.Sprite | null) => { spriteRefs.current[i][j] = el; }}
                scale={[iconSz, iconSz, 1]}
                visible={j === initForm}
              >
                <spriteMaterial
                  map={tex}
                  transparent
                  opacity={0.22}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </sprite>
            ))}
          </group>
        );
      })}

      {/* Connection beams from node to core */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={N * 2}
            array={lineArr}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6E3BFF"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── Ambient particles ────────────────────────────────────────────────────────

function Particles({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.5 + Math.random() * 3.5;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.5;
      vel[i * 3]     = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { pos, vel };
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += vel[i * 3];
      arr[i * 3 + 1] += vel[i * 3 + 1];
      arr[i * 3 + 2] += vel[i * 3 + 2];
      const d = Math.sqrt(arr[i * 3] ** 2 + arr[i * 3 + 1] ** 2 + arr[i * 3 + 2] ** 2);
      if (d > 6.2) { arr[i * 3] *= 0.48; arr[i * 3 + 1] *= 0.48; arr[i * 3 + 2] *= 0.48; }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#B7A7FF" size={0.014} transparent opacity={0.38}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Scan ring ────────────────────────────────────────────────────────────────

function ScanRing() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.16;
    ref.current.rotation.y = t * 0.06;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.12 + Math.sin(t * 0.9) * 0.07;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.6, 0.003, 8, 200]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.15} />
    </mesh>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────

export default function AmbientScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
    >
      <DigitalCore />
      <OrbitalSystem />
      <Particles />
      <ScanRing />
    </Canvas>
  );
}
