import { RefObject, useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useControls } from "leva";

import usePlayerControl from "./usePlayerControls";

type PlayerAnimationsProps = {
  animations: GLTF["animations"];
  playerRef: RefObject<THREE.Group | null>;
};

const usePlayerAnimations = ({
  animations,
  playerRef,
}: PlayerAnimationsProps) => {
  const {
    forwardPressed,
    backPressed,
    leftPressed,
    rightPressed,
    // jumpPressed,
  } = usePlayerControl();

  const { actions } = useAnimations(animations, playerRef);

  const { runSpeed, idleSpeed } = useControls(
    "Player 🤖",
    {
      runSpeed: {
        value: 1.2,
        min: 0,
        max: 2,
        step: 0.1,
        label: "Run Animation Speed",
      },
      idleSpeed: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.1,
        label: "Idle Animation Speed",
      },
    },
    { collapsed: true }
  );

  const currentAction = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (!actions) return;

    const runAction = actions["CharacterArmature|Run"];
    const idleAction = actions["CharacterArmature|Idle"];

    if (!runAction || !idleAction) return;

    // Apply animation speeds
    runAction.timeScale = runSpeed;
    idleAction.timeScale = idleSpeed;

    const isMoving =
      forwardPressed || backPressed || leftPressed || rightPressed;

    const nextAction = isMoving ? runAction : idleAction;

    if (currentAction.current !== nextAction) {
      currentAction.current?.fadeOut(0.3);
      nextAction.reset().fadeIn(0.3).play();
      currentAction.current = nextAction;
    }
  }, [
    forwardPressed,
    backPressed,
    leftPressed,
    rightPressed,
    actions,
    runSpeed,
    idleSpeed,
  ]);
};

export default usePlayerAnimations;
