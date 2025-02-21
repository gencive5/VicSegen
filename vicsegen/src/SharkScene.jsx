import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function SpinningShark({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01; // Rotate continuously
  });

  return <primitive object={scene} ref={ref} scale={2} />;
}

export default function SharkScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <SpinningShark url="/shark.glb" />  {/* Replace with your actual file path */}
    </Canvas>
  );
}
