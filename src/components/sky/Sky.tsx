import { shaderMaterial } from "@react-three/drei";
import { extend, ThreeElement } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import { useControls } from "leva";
import * as THREE from "three";

import vertexShader from "@/materials/sky/vertex.glsl?raw";
import fragmentShader from "@/materials/sky/fragment.glsl?raw";

const Sky = () => {
  const { colorBottom, colorTop, colorMiddle, blendMiddle, blendIntensity } =
    useControls(
      "Sky 🌄",
      {
        colorTop: "#0e1c3e",
        colorMiddle: "#ffa200",
        colorBottom: "#160c2a",
        blendMiddle: {
          value: 0.2,
          min: 0,
          max: 1,
          step: 0.01,
        },
        blendIntensity: {
          value: 0.06,
          min: 0,
          max: 1,
          step: 0.01,
        },
      },
      {
        collapsed: true,
      }
    );

  return (
    <mesh rotation-x={degToRad(-5)}>
      <sphereGeometry args={[200, 64, 64]} />
      <skyMaterial
        side={THREE.BackSide}
        toneMapped={false}
        depthWrite={false}
        colorBottom={colorBottom}
        colorTop={colorTop}
        colorMiddle={colorMiddle}
        blendMiddle={blendMiddle}
        blendIntensity={blendIntensity}
      />
    </mesh>
  );
};

const SkyMaterial = shaderMaterial(
  {
    colorTop: new THREE.Color("#0e1c3e"),
    colorMiddle: new THREE.Color("#ffa200"),
    colorBottom: new THREE.Color("#160c2a"),
    blendMiddle: 0.2,
    blendIntensity: 0.06,
  },
  vertexShader,
  fragmentShader
);

declare module "@react-three/fiber" {
  interface ThreeElements {
    skyMaterial: ThreeElement<typeof SkyMaterial>;
  }
}

extend({ SkyMaterial });

export default Sky;
