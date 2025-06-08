import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ThreeElements } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/Addons.js";

import usePlayerAnimations from "@/hooks/usePlayerAnimations";
import { usePlayerMovement } from "@/hooks/usePlayerMovement";

type GLTFResult = GLTF & {
  nodes: {
    Root: THREE.Bone;
    Body_2: THREE.SkinnedMesh;
    Body_3: THREE.SkinnedMesh;
    Body_4: THREE.SkinnedMesh;
    Ears: THREE.SkinnedMesh;
    Head_2: THREE.SkinnedMesh;
    Head_3: THREE.SkinnedMesh;
    Head_4: THREE.SkinnedMesh;
    Head_5: THREE.SkinnedMesh;
    Head_6: THREE.SkinnedMesh;
    Arms_1: THREE.SkinnedMesh;
    Arms_2: THREE.SkinnedMesh;
  };
  materials: {
    Main: THREE.Material;
    Main_Light: THREE.Material;
    Main2: THREE.Material;
    EyeColor: THREE.Material;
    White: THREE.Material;
    Black: THREE.Material;
  };
};

type PlayerProps = ThreeElements["group"];

export const Player = (props: PlayerProps) => {
  const { nodes, materials, animations } = useGLTF(
    "/models/player.glb"
  ) as unknown as GLTFResult;

  const playerRef = useRef<THREE.Group>(null);
  usePlayerAnimations({ animations, playerRef });
  usePlayerMovement(playerRef);

  return (
    <group ref={playerRef} {...props} position={[0, 30, 0]} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group name="Body_1" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Body_2"
              geometry={nodes.Body_2.geometry}
              material={materials.Main}
              skeleton={nodes.Body_2.skeleton}
            />
            <skinnedMesh
              name="Body_3"
              geometry={nodes.Body_3.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Body_3.skeleton}
            />
            <skinnedMesh
              name="Body_4"
              geometry={nodes.Body_4.geometry}
              material={materials.Main2}
              skeleton={nodes.Body_4.skeleton}
            />
          </group>
          <skinnedMesh
            name="Ears"
            geometry={nodes.Ears.geometry}
            material={materials.Main}
            skeleton={nodes.Ears.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <group name="Head_1" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Head_2"
              geometry={nodes.Head_2.geometry}
              material={materials.Main}
              skeleton={nodes.Head_2.skeleton}
            />
            <skinnedMesh
              name="Head_3"
              geometry={nodes.Head_3.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Head_3.skeleton}
            />
            <skinnedMesh
              name="Head_4"
              geometry={nodes.Head_4.geometry}
              material={materials.EyeColor}
              skeleton={nodes.Head_4.skeleton}
            />
            <skinnedMesh
              name="Head_5"
              geometry={nodes.Head_5.geometry}
              material={materials.White}
              skeleton={nodes.Head_5.skeleton}
            />
            <skinnedMesh
              name="Head_6"
              geometry={nodes.Head_6.geometry}
              material={materials.Black}
              skeleton={nodes.Head_6.skeleton}
            />
          </group>
          <group name="Arms" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Arms_1"
              geometry={nodes.Arms_1.geometry}
              material={materials.Main}
              skeleton={nodes.Arms_1.skeleton}
            />
            <skinnedMesh
              name="Arms_2"
              geometry={nodes.Arms_2.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Arms_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/player.glb");
