import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function SpinningShark({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  // Preserve original material color
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.toneMapped = false; // Prevent lights from altering original color too much
    }
  });

  useFrame(() => {
    ref.current.rotation.y += 0.01; // Rotate continuously
  });

  return <primitive object={scene} ref={ref} scale={15} />;
}

export default function SharkScene() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2} />
      </EffectComposer>

      {/* Softer ambient light to preserve color */}
      <ambientLight intensity={1} color={"#a0c4ff"} />

      {/* Neutral directional light */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} color={"#ffffff"} />

      {/* Spotlight with less color tint */}
      <spotLight
        position={[0, 5, 10]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color={"#ccccff"}
      />

      <SpinningShark url="/shark.glb" />
    </Canvas>
  );
}
