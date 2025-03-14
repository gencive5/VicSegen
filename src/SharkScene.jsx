import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingCursors({ sharkRef, link }) {
  if (!link) return null;
  
  const cursors = [useRef(), useRef(), useRef()];
  const { scene: cursorModel } = useGLTF("/fleche.glb");
  const orbitRadius = 12;

  cursorModel.traverse((child) => {
    if (child.isMesh) {
      child.material.color = new THREE.Color(0xffd700);
      child.material.emissive = new THREE.Color(0xffd700);
      child.material.emissiveIntensity = 3;
    }
  });

  const handleCursorClick = () => {
    if (link) {
      setTimeout(() => {
        window.open(link, "_blank");
      }, 0);
    }
  };

  useFrame(() => {
    if (sharkRef.current) {
      const t = performance.now() * 0.001;
      cursors.forEach((cursorRef, index) => {
        const angle = t + index * Math.PI * 0.66;
        cursorRef.current.position.set(
          Math.cos(angle) * orbitRadius,
          Math.sin(angle * 0.5) * 3,
          Math.sin(angle) * orbitRadius
        );
        cursorRef.current.rotation.y = angle + Math.PI / 2;
      });
    }
  });

  return (
    <>
      {cursors.map((ref, index) => (
        <primitive
          key={index}
          object={cursorModel.clone()}
          ref={ref}
          scale={6}
          onClick={handleCursorClick}
          onPointerDown={handleCursorClick}
          style={{ cursor: "pointer" }}
        />
      ))}
    </>
  );
}

function SpinningShark({ url, link }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.toneMapped = false;
      if (link) {
        child.material.emissive = new THREE.Color(0x00ffff);
        child.material.emissiveIntensity = 2;
      } else {
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0;
      }
    }
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  const handleClick = () => {
    if (link) {
      setTimeout(() => {
        window.open(link, "_blank");
      }, 0);
    }
  };

  return (
    <group onClick={handleClick} onPointerDown={handleClick} style={{ cursor: link ? "pointer" : "default" }}>
      <primitive object={scene} ref={ref} scale={15} />
      {link && <FloatingCursors sharkRef={ref} link={link} />} 
    </group>
  );
}

export default function SharkScene({ link }) {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2} />
      </EffectComposer>

      <ambientLight intensity={1} color={"#a0c4ff"} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color={"#ffffff"} />
      <spotLight position={[0, 5, 10]} angle={0.4} penumbra={1} intensity={4} color={"#ccccff"} />

      <SpinningShark url="/shark.glb" link={link} />
    </Canvas>
  );
}
