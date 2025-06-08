import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, ThreeElement } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

import vertexShader from "@/materials/floor/vertex.glsl?raw";
import fragmentShader from "@/materials/floor/fragment.glsl?raw";
import { Player } from "../player/Player";

const FloorMaterial = shaderMaterial(
  {
    uFrequency: 10,
    uElevationScalar: 10,
    uValleyThreshold: 0.3,
    uPlateauThreshold: 0.85,
    uPlayerPosition: new THREE.Vector2(0, 0),
    uScale: 1.0,
  },
  vertexShader,
  fragmentShader
);

declare module "@react-three/fiber" {
  interface ThreeElements {
    floorMaterial: ThreeElement<typeof FloorMaterial>;
  }
}

extend({ FloorMaterial });

const Floor = () => {
  const floorRef = useRef<THREE.ShaderMaterial>(null);

  const {
    length,
    breadth,
    lengthSegments,
    breadthSegments,
    wireframe,
    elevationScalar,
    frequency,
    valleyThreshold,
    plateauThreshold,
    scale,
  } = useControls(
    "Floor 🪩",
    {
      length: { value: 300, step: 10, min: 10, max: 500 },
      breadth: { value: 300, step: 10, min: 10, max: 500 },
      lengthSegments: { value: 60, step: 10, min: 10, max: 500 },
      breadthSegments: { value: 60, step: 10, min: 10, max: 500 },
      elevationScalar: { value: 35, min: 0, max: 50 },
      frequency: { value: 5, min: 1, max: 50 },
      valleyThreshold: { value: 0.3, min: 0, max: 1 },
      plateauThreshold: { value: 0.7, min: 0, max: 1 },
      scale: { value: 1.0 },
      wireframe: false,
    },
    { collapsed: true }
  );

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry
          args={[length, breadth, lengthSegments, breadthSegments]}
        />
        <floorMaterial
          ref={floorRef}
          wireframe={wireframe}
          uElevationScalar={elevationScalar}
          uFrequency={frequency}
          uValleyThreshold={valleyThreshold}
          uPlateauThreshold={plateauThreshold}
          uScale={scale}
          toneMapped={false}
          depthWrite={false}
          transparent
        />
      </mesh>
      <Player />
    </group>
  );
};

export default Floor;

useTexture.preload("/textures/terrain.png");
