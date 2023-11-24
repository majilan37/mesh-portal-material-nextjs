import { Characters, SetState } from "@/types";
import {
  useTexture,
  RoundedBox,
  MeshPortalMaterial,
  Environment,
  PortalMaterialType,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type Props = {
  path: string;
  name: Characters;
  setHovered: SetState<Characters | null>;
  setActive: SetState<Characters | null>;
  color: string;
  active: Characters | null;
} & JSX.IntrinsicElements["group"];

function MonsterStage({
  children,
  path,
  name,
  setHovered,
  setActive,
  active,
  color,
  ...props
}: Props) {
  const texture = useTexture(path);
  const portalRef = useRef<PortalMaterialType>(null);

  useFrame((_, delta) => {
    const open = active === name;
    easing.damp(portalRef.current!, "blend", open ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="/fonts/Caprasimo-Regular.ttf"
        position={[0, -1.35, 0.051]}
        anchorY={"bottom"}
        fontSize={0.3}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        onDoubleClick={() => {
          if (active && active !== name) return;

          setActive((p) => (p === name ? null : name));
        }}
        onPointerEnter={() => {
          if (active && active !== name) return;
          setHovered(name);
        }}
        onPointerLeave={() => setHovered(null)}
        args={[3, 4, 0.1]}>
        <MeshPortalMaterial ref={portalRef}>
          <ambientLight color={"#fff"} intensity={1} />
          <Environment preset="sunset" />

          {children}

          <mesh position={[0, 0, 1]}>
            <sphereGeometry args={[35, 50, 50]} />
            <meshStandardMaterial
              map={texture}
              color={"lightgray"}
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
}

export default MonsterStage;
