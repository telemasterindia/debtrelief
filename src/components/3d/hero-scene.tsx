"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import type { Quality } from "./capabilities";
import {
  createCardTexture,
  createChipTexture,
  createDocumentTexture,
  createShadowTexture,
  createSheetTexture,
} from "./textures";

type SceneProps = { quality: Quality; reducedMotion: boolean };

const DOC_W = 2.5;
const DOC_H = 3.28;
const damp = THREE.MathUtils.damp;

/** Entrance choreography: each element eases in after its own delay (seconds). */
const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
const intro = (t: number, delay: number, duration = 1.1) => easeOut((t - delay) / duration);

/* ------------------------------------------------------------------ */
/* Credit cards — the debt Greenlight helps with                       */
/* ------------------------------------------------------------------ */

function CreditCards({ reducedMotion }: { reducedMotion: boolean }) {
  const charcoal = useMemo(() => createCardTexture("charcoal"), []);
  const green = useMemo(() => createCardTexture("green"), []);
  const back = useRef<THREE.Group>(null);
  const front = useRef<THREE.Group>(null);
  useEffect(() => () => { charcoal.dispose(); green.dispose(); }, [charcoal, green]);
  useFrame(({ clock }) => {
    if (!back.current || !front.current || reducedMotion) return;
    const t = clock.elapsedTime;
    const p = intro(t, 0.35, 1.3);
    back.current.position.y = 1.15 + (1 - p) * 0.8 + Math.sin(t * 0.45) * 0.03;
    front.current.position.y = 0.92 + (1 - p) * 1.0 + Math.sin(t * 0.45 + 0.8) * 0.035;
    front.current.rotation.z = 0.2 + Math.sin(t * 0.35) * 0.015;
  });
  const W = 1.6;
  const H = W / 1.586;
  const card = (tex: THREE.Texture) => (
    <>
      <RoundedBox args={[W, H, 0.025]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial color="#1f2620" metalness={0.4} roughness={0.35} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0131]}>
        <planeGeometry args={[W - 0.04, H - 0.04]} />
        <meshPhysicalMaterial map={tex} roughness={0.32} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </>
  );
  return (
    <>
      <group ref={back} position={[-1.55, 1.15, -0.9]} rotation={[0.1, 0.35, 0.28]}>
        {card(charcoal)}
      </group>
      <group ref={front} position={[-1.35, 0.92, -0.55]} rotation={[0.05, 0.3, 0.2]}>
        {card(green)}
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Document stack                                                      */
/* ------------------------------------------------------------------ */

function DocumentStack({ reducedMotion }: { reducedMotion: boolean }) {
  const docTex = useMemo(() => createDocumentTexture(), []);
  const sheetTex = useMemo(() => createSheetTexture("#c9d6ea"), []);
  const sheetTex2 = useMemo(() => createSheetTexture("#9fb3d3"), []);
  const scan = useRef<THREE.Mesh>(null);

  useEffect(
    () => () => {
      docTex.dispose();
      sheetTex.dispose();
      sheetTex2.dispose();
    },
    [docTex, sheetTex, sheetTex2],
  );

  useFrame(({ clock }) => {
    if (!scan.current) return;
    const mat = scan.current.material as THREE.MeshBasicMaterial;
    if (reducedMotion) {
      scan.current.position.y = -0.32;
      mat.opacity = 0.5;
      return;
    }
    // A slow scan that travels down the page every ~7 seconds.
    const t = (clock.elapsedTime % 7) / 7;
    scan.current.position.y = THREE.MathUtils.lerp(DOC_H / 2 - 0.25, -DOC_H / 2 + 0.25, t);
    mat.opacity = Math.sin(t * Math.PI) * 0.75;
  });

  return (
    <group>
      {/* back sheets */}
      <group position={[0.55, 0.28, -0.5]} rotation={[0, 0, 0.13]}>
        <RoundedBox args={[DOC_W, DOC_H, 0.03]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#7c8a80" roughness={0.55} metalness={0.1} transparent opacity={0.55} />
        </RoundedBox>
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[DOC_W - 0.08, DOC_H - 0.08]} />
          <meshStandardMaterial map={sheetTex2} transparent opacity={0.45} roughness={0.7} />
        </mesh>
      </group>
      <group position={[0.28, 0.14, -0.26]} rotation={[0, 0, 0.065]}>
        <RoundedBox args={[DOC_W, DOC_H, 0.03]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#b7c2ba" roughness={0.5} metalness={0.05} transparent opacity={0.8} />
        </RoundedBox>
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[DOC_W - 0.08, DOC_H - 0.08]} />
          <meshStandardMaterial map={sheetTex} transparent opacity={0.7} roughness={0.7} />
        </mesh>
      </group>

      {/* main document */}
      <group>
        <RoundedBox args={[DOC_W, DOC_H, 0.045]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial color="#f4f7fb" roughness={0.42} clearcoat={0.5} clearcoatRoughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0235]}>
          <planeGeometry args={[DOC_W - 0.06, DOC_H - 0.06]} />
          {/* A little self-illumination keeps the plan crisp and readable under any light angle. */}
          <meshStandardMaterial map={docTex} emissiveMap={docTex} emissive="#ffffff" emissiveIntensity={0.32} roughness={0.55} metalness={0} />
        </mesh>
        {/* scanning highlight */}
        <mesh ref={scan} position={[0, 0, 0.03]}>
          <planeGeometry args={[DOC_W - 0.12, 0.05]} />
          <meshBasicMaterial color="#8cc861" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Verification shield                                                 */
/* ------------------------------------------------------------------ */

function Shield({ quality }: { quality: Quality }) {
  const geometry = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.62);
    s.bezierCurveTo(0.22, 0.52, 0.38, 0.5, 0.52, 0.5);
    s.lineTo(0.52, 0.05);
    s.bezierCurveTo(0.52, -0.33, 0.28, -0.58, 0, -0.7);
    s.bezierCurveTo(-0.28, -0.58, -0.52, -0.33, -0.52, 0.05);
    s.lineTo(-0.52, 0.5);
    s.bezierCurveTo(-0.38, 0.5, -0.22, 0.52, 0, 0.62);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.045,
      bevelSegments: quality === "high" ? 6 : 3,
      curveSegments: quality === "high" ? 32 : 16,
    });
    g.center();
    return g;
  }, [quality]);

  const check = useMemo(() => {
    const path = new THREE.CurvePath<THREE.Vector3>();
    path.add(new THREE.LineCurve3(new THREE.Vector3(-0.2, 0.0, 0), new THREE.Vector3(-0.05, -0.16, 0)));
    path.add(new THREE.LineCurve3(new THREE.Vector3(-0.05, -0.16, 0), new THREE.Vector3(0.24, 0.17, 0)));
    return new THREE.TubeGeometry(path, 24, 0.045, 12, false);
  }, []);

  useEffect(() => () => { geometry.dispose(); check.dispose(); }, [geometry, check]);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color="#378108" metalness={0.55} roughness={0.22} clearcoat={1} clearcoatRoughness={0.12} />
      </mesh>
      <mesh geometry={check} position={[0, 0, 0.13]}>
        <meshStandardMaterial color="#ffffff" emissive="#eef6e7" emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Magnifying glass                                                    */
/* ------------------------------------------------------------------ */

function Magnifier({ quality }: { quality: Quality }) {
  return (
    <group rotation={[0.15, -0.35, -0.5]}>
      <mesh>
        <torusGeometry args={[0.5, 0.055, 24, quality === "high" ? 96 : 48]} />
        <meshStandardMaterial color="#d7e0ec" metalness={1} roughness={0.2} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.49, 64]} />
        {quality === "high" ? (
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.25}
            roughness={0.04}
            ior={1.35}
            color="#e6f6ff"
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshPhysicalMaterial color="#bfe6ff" transparent opacity={0.16} roughness={0.05} clearcoat={1} side={THREE.DoubleSide} />
        )}
      </mesh>
      <mesh position={[0, -0.93, 0]}>
        <cylinderGeometry args={[0.065, 0.075, 0.78, 24]} />
        <meshStandardMaterial color="#2c352e" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.53, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 0.08, 24]} />
        <meshStandardMaterial color="#d7e0ec" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Metadata panels and connections                                     */
/* ------------------------------------------------------------------ */

const CHIPS = [
  { label: "Custom plan", pos: [1.8, 1.3, 0.55] as const, anchor: [DOC_W / 2, 1.1, 0.02] as const, depth: 1.4 },
  { label: "Negotiation", pos: [1.9, -0.3, 0.8] as const, anchor: [DOC_W / 2, -0.45, 0.02] as const, depth: 1.8 },
  { label: "Online access", pos: [-1.7, -1.7, 0.65] as const, anchor: [-DOC_W / 2, -1.25, 0.02] as const, depth: 1.6 },
];

function Chip({ label, position, depth, delay, reducedMotion }: { label: string; position: readonly [number, number, number]; depth: number; delay: number; reducedMotion: boolean }) {
  const tex = useMemo(() => createChipTexture(label), [label]);
  const ref = useRef<THREE.Mesh>(null);
  const width = label.length > 10 ? 1.45 : 1.3;
  useEffect(() => () => tex.dispose(), [tex]);
  useFrame(({ pointer, clock }, delta) => {
    if (!ref.current || reducedMotion) return;
    const s = 0.6 + 0.4 * intro(clock.elapsedTime, delay, 0.7);
    ref.current.scale.setScalar(s);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = intro(clock.elapsedTime, delay, 0.6);
    // Parallax: nearer panels move a little more than the document.
    ref.current.position.x = damp(ref.current.position.x, position[0] + pointer.x * 0.035 * depth, 3, delta);
    ref.current.position.y = damp(
      ref.current.position.y,
      position[1] + pointer.y * 0.03 * depth + Math.sin(clock.elapsedTime * 0.6 + depth * 3) * 0.025,
      3,
      delta,
    );
  });
  return (
    <mesh ref={ref} position={position as unknown as THREE.Vector3Tuple}>
      <planeGeometry args={[width, width * (150 / 560)]} />
      <meshBasicMaterial map={tex} transparent opacity={reducedMotion ? 1 : 0} toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

function Connections() {
  const lines = useMemo(
    () =>
      CHIPS.map((c) => {
        const start = new THREE.Vector3(...c.anchor);
        const end = new THREE.Vector3(c.pos[0] - Math.sign(c.pos[0]) * 0.55, c.pos[1], c.pos[2]);
        const mid = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, 0.15, 0.2));
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
        const mat = new THREE.LineBasicMaterial({ color: "#a6d67f", transparent: true, opacity: 0.45 });
        return new THREE.Line(geom, mat);
      }),
    [],
  );
  useEffect(
    () => () =>
      lines.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      }),
    [lines],
  );
  return (
    <group>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
      {CHIPS.map((c) => (
        <mesh key={c.label} position={c.anchor as unknown as THREE.Vector3Tuple}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#a6d67f" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Light trails                                                        */
/* ------------------------------------------------------------------ */

const trailVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const trailFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float head = fract(uTime * 0.07 + uOffset);
    float d = head - vUv.x;
    if (d < 0.0) d += 1.0;
    float tail = smoothstep(0.35, 0.0, d);
    float alpha = tail * tail * 0.85;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function LightTrail({ points, offset, reducedMotion }: { points: [number, number, number][]; offset: number; reducedMotion: boolean }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.5);
    return new THREE.TubeGeometry(curve, 160, 0.012, 8, false);
  }, [points]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: trailVertex,
        fragmentShader: trailFragment,
        uniforms: { uTime: { value: reducedMotion ? 4 : 0 }, uOffset: { value: offset }, uColor: { value: new THREE.Color("#a6d67f") } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [offset, reducedMotion],
  );
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (reducedMotion || !mesh.current) return;
    (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value += delta;
  });
  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

/* ------------------------------------------------------------------ */
/* Scene composition                                                   */
/* ------------------------------------------------------------------ */

function Rig({ quality, reducedMotion }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const doc = useRef<THREE.Group>(null);
  const magnifier = useRef<THREE.Group>(null);
  const shield = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.PointLight>(null);
  const shadowTex = useMemo(() => createShadowTexture(), []);
  const { size } = useThree();
  useEffect(() => () => shadowTex.dispose(), [shadowTex]);

  // Fit the composition to narrow canvases.
  const scale = Math.min(0.94, (size.width / size.height) * 0.96);

  useFrame(({ pointer, clock }, delta) => {
    const t = clock.elapsedTime;
    if (!root.current || !doc.current || !magnifier.current || !shield.current) return;
    if (reducedMotion) return;

    root.current.rotation.y = damp(root.current.rotation.y, -0.14 + pointer.x * 0.09, 1.8, delta);
    root.current.rotation.x = damp(root.current.rotation.x, 0.05 - pointer.y * 0.05, 1.8, delta);

    const pDoc = intro(t, 0, 1.4);
    doc.current.position.y = Math.sin(t * 0.5) * 0.035 - (1 - pDoc) * 0.6;
    doc.current.scale.setScalar(0.9 + 0.1 * pDoc);
    doc.current.rotation.z = Math.sin(t * 0.35) * 0.006;

    const pMag = intro(t, 0.6, 1.2);
    magnifier.current.position.x = -1.05 + Math.sin(t * 0.4) * 0.06 + pointer.x * 0.05 - (1 - pMag) * 1.2;
    magnifier.current.position.y = -0.2 + Math.cos(t * 0.45) * 0.05 + pointer.y * 0.04;

    const pShield = intro(t, 0.8, 1.2);
    shield.current.position.y = -1.35 + Math.sin(t * 0.55 + 1) * 0.04 - (1 - pShield) * 0.9;
    shield.current.rotation.y = -0.35 + Math.sin(t * 0.4) * 0.05 + pointer.x * 0.08 + (1 - pShield) * 0.8;
    shield.current.scale.setScalar(0.95 * (0.7 + 0.3 * pShield));

    if (keyLight.current) {
      keyLight.current.position.x = damp(keyLight.current.position.x, 1.5 + pointer.x * 1.8, 1.5, delta);
      keyLight.current.position.y = damp(keyLight.current.position.y, 1.8 + pointer.y * 1.2, 1.5, delta);
    }
  });

  return (
    <>
      {/* Atmospheric depth: objects further back fade gently into the background. */}
      <fog attach="fog" args={["#141a16", 10.2, 16]} />
      <hemisphereLight args={["#f6f8f2", "#1d2a17", 0.55]} />
      <directionalLight position={[3, 4, 5]} intensity={1.85} color="#fff8ee" />
      {/* Greenlight rim light from behind for depth and brand colour */}
      <spotLight position={[-3.5, 2.5, -4]} angle={0.7} penumbra={1} intensity={24} distance={14} color="#6fae3c" />
      <directionalLight position={[-5, -1, 2]} intensity={0.6} color="#a6d67f" />
      <pointLight ref={keyLight} position={[1.5, 1.8, 3]} intensity={9} distance={12} color="#fff6e8" />

      <Environment resolution={quality === "high" ? 256 : 128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[10, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.4} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 8, 1]} color="#a6d67f" />
        <Lightformer form="rect" intensity={1} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 8, 1]} color="#d9ecc8" />
        <Lightformer form="circle" intensity={0.8} position={[0, -4, 2]} scale={4} color="#1e3a8a" />
      </Environment>

      <group ref={root} scale={scale} rotation={[0.05, -0.16, 0]}>
        <CreditCards reducedMotion={reducedMotion} />

        <group ref={doc} position={[0.15, 0.05, 0]}>
          <DocumentStack reducedMotion={reducedMotion} />
        </group>

        <group ref={magnifier} position={[-1.05, -0.2, 0.9]}>
          <Magnifier quality={quality} />
        </group>

        <group ref={shield} position={[1.45, -1.35, 0.95]} rotation={[0.1, -0.35, 0]} scale={0.95}>
          <Shield quality={quality} />
        </group>

        <Connections />
        {CHIPS.map((c, i) => (
          <Chip key={c.label} label={c.label} position={c.pos} depth={c.depth} delay={1.0 + i * 0.22} reducedMotion={reducedMotion} />
        ))}

        <LightTrail
          reducedMotion={reducedMotion}
          offset={0}
          points={[[-3.4, 1.9, -0.6], [-1.6, 2.2, 0.3], [0.6, 1.95, 0.9], [2.4, 1.1, 0.2], [3.4, 0.2, -0.8]]}
        />
        <mesh position={[0.1, -2.25, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.6, 1.4]} />
          <meshBasicMaterial map={shadowTex} transparent depthWrite={false} opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

export default function HeroScene({
  quality,
  reducedMotion,
  active,
  eventSource,
  onReady,
  onFallback,
}: SceneProps & {
  active: boolean;
  eventSource?: RefObject<HTMLElement | null>;
  onReady?: () => void;
  /** Called if the device cannot keep a smooth frame rate even at reduced resolution. */
  onFallback?: () => void;
}) {
  const [dpr, setDpr] = useState(quality === "high" ? 1.75 : 1.25);
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 30 }}
      dpr={[1, dpr]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reducedMotion ? "demand" : active ? "always" : "never"}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        onReady?.();
      }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => setDpr(1)}
        onFallback={() => onFallback?.()}
      >
        <Rig quality={quality} reducedMotion={reducedMotion} />
      </PerformanceMonitor>
    </Canvas>
  );
}
