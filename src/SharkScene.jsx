import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF, Sphere } from "@react-three/drei";
import { useRef } from "react";

function FloatingCursors({ sharkRef }) {
  const cursors = [useRef(), useRef(), useRef()];
  const orbitRadius = 15; 

  useFrame(() => {
    if (sharkRef.current) {
      const t = performance.now() * 0.001;
      cursors.forEach((cursor, index) => {
        const angle = t + (index * Math.PI * 0.66);
        cursor.current.position.x = sharkRef.current.position.x + Math.cos(angle) * orbitRadius;
        cursor.current.position.z = sharkRef.current.position.z + Math.sin(angle) * orbitRadius;
        cursor.current.position.y = sharkRef.current.position.y; // Keep Y consistent for horizontal movement
      });
    }
  });

  return (
    <>
      {cursors.map((ref, index) => (
        <Sphere key={index} ref={ref} args={[0.3, 10, 10]}>
          <meshStandardMaterial color="yellow" emissive="white" emissiveIntensity={2} />
        </Sphere>
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
      {link && <FloatingCursors sharkRef={ref} />} 
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
