"use client";

import {
  CameraControls,
  Environment,
  OrbitControls,
  useCursor,
  useTexture,
} from "@react-three/drei";
import Fish from "@/components/Models/Fish";
import MonsterStage from "./MonsterStage";
import DragonEvolved from "./Models/DragonEvolved";
import Cactoro from "./Models/Cactoro";
import React, { useEffect, useRef, useState } from "react";
import { Characters } from "@/types";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { toRadians } from "@/utils";

function Experience() {
  const [hovered, setHovered] = React.useState<Characters | null>(null);
  const [active, setActive] = useState<Characters | null>(null);
  const scene = useThree((state) => state.scene);
  const cameraControlsRef = useRef<CameraControls>(null);

  // * Change cursor when you hover over the card
  useCursor(!!hovered);

  // * Animate the camera when a card is active
  useEffect(() => {
    if (active) {
      const position = new THREE.Vector3();
      scene.getObjectByName(active)?.getWorldPosition(position);

      cameraControlsRef.current?.setLookAt(
        0,
        0,
        5,
        position.x,
        position.y,
        position.z,
        true
      );
    } else {
      cameraControlsRef.current?.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight color={"#fff"} intensity={1} />
      <Environment preset="sunset" />

      <CameraControls
        ref={cameraControlsRef}
        maxDistance={15}
        minDistance={10}
        maxPolarAngle={toRadians(90)}
        minPolarAngle={toRadians(30)}
      />

      <MonsterStage
        setHovered={setHovered}
        setActive={setActive}
        active={active}
        name="Dragon"
        color="#df8d52"
        path="/textures/anime_art_style_lava_world.jpg"
        position={[-4, 0, 0]}>
        <DragonEvolved
          scale={0.6}
          hovered={hovered === "Dragon"}
          position={[0, -1, 0]}
        />
      </MonsterStage>

      <MonsterStage
        setHovered={setHovered}
        setActive={setActive}
        active={active}
        name="Fish"
        color="#38adcf"
        path="/textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        position-z={1}>
        <Fish scale={0.6} hovered={hovered === "Fish"} position={[0, -1, 0]} />
      </MonsterStage>

      <MonsterStage
        setHovered={setHovered}
        setActive={setActive}
        active={active}
        name="Cactoro"
        color="#739d3c"
        path="/textures/anime_art_style_cactus_forest.jpg"
        position={[4, 0, 0]}>
        <Cactoro
          scale={0.6}
          hovered={hovered === "Cactoro"}
          position={[0, -1, 0]}
        />
      </MonsterStage>
    </>
  );
}

export default Experience;
