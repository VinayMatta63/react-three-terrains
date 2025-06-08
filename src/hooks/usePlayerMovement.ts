import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

import usePlayerControl from "./usePlayerControls";

export const usePlayerMovement = (
  playerRef: React.RefObject<THREE.Group | null>
) => {
  const direction = useRef(new THREE.Vector3());
  const frontVector = useRef(new THREE.Vector3());
  const sideVector = useRef(new THREE.Vector3());
  const { movementSpeed } = useControls(
    "Player 🤖",
    {
      movementSpeed: {
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        label: "Speed",
      },
    },
    { collapsed: true }
  );

  const { forwardPressed, leftPressed, rightPressed, backPressed } =
    usePlayerControl();

  useFrame(() => {
    if (!playerRef.current) return;

    // Reset movement vectors
    frontVector.current.set(0, 0, 0);
    sideVector.current.set(0, 0, 0);

    // Update movement direction based on key presses
    if (forwardPressed) frontVector.current.z -= 1;
    if (backPressed) frontVector.current.z = 1;
    if (leftPressed) sideVector.current.x = 1;
    if (rightPressed) sideVector.current.x -= 1;

    // Combine front and side vectors
    direction.current
      .subVectors(frontVector.current, sideVector.current)
      .normalize()
      .multiplyScalar(movementSpeed);

    // Update player position
    playerRef.current.position.x += direction.current.x;
    playerRef.current.position.z += direction.current.z;

    // Rotate player to face movement direction
    if (direction.current.length() > 0) {
      const angle = Math.atan2(direction.current.x, direction.current.z);
      playerRef.current.rotation.y = angle;
    }
  });
};
