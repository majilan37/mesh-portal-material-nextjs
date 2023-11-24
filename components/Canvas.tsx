"use client";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import Experience from "./Experience";

function Canvas() {
  return (
    <ThreeCanvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
      <Experience />
    </ThreeCanvas>
  );
}

export default Canvas;
