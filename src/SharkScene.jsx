import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three'; // Import THREE for color manipulation

function FloatingCursors({ sharkRef, link }) {
  const cursors = [useRef(), useRef(), useRef()];
  const { scene: cursorModel } = useGLTF("/arrowyellow.glb");
  const orbitRadius = 12; // Larger orbit radius

  // Pearl Grey color in RGB
  const pearlGrey = new THREE.Color(0xA9A9A9); // Pearl grey color

  const handleCursorClick = () => {
    if (link) {
      setTimeout(() => {
        window.open(link, "_blank");
      }, 0);
    }
  };

  // Set the cursor's material to pearl grey right after loading the model
  cursorModel.traverse((child) => {
    if (child.isMesh) {
      child.material.color = pearlGrey;  // Force the material color to pearl grey
    }
  });

  useFrame(() => {
    if (sharkRef.current) {
      const t = performance.now() * 0.0006;
      cursors.forEach((cursorRef, index) => {
        const angle = t + (index * Math.PI * 0.66); // Reverse direction by adding
        cursorRef.current.position.x = Math.cos(angle) * orbitRadius;
        cursorRef.current.position.z = Math.sin(angle) * orbitRadius;
        cursorRef.current.position.y = Math.sin(angle * 0.5) * 3; // Adds vertical wave for cylindrical motion
        cursorRef.current.rotation.y = angle + Math.PI / 2; // Align cursor along orbit direction
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
          scale={2}
          onClick={handleCursorClick}
          onPointerDown={handleCursorClick} // Ensure the cursor is clickable
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
    <group>
      <primitive object={scene} ref={ref} scale={15} onClick={handleClick} onPointerDown={handleClick} style={{ cursor: "pointer" }} />
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
