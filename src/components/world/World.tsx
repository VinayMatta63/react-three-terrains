import {
  KeyboardControls,
  KeyboardControlsEntry,
  Stars,
} from "@react-three/drei";
import { useControls } from "leva";
import Sky from "@/components/sky/Sky";
import Floor from "@/components/terrain/Terrain";
import { Controls } from "@/hooks/usePlayerControls";
import { useMemo } from "react";

const World = () => {
  const { count, speed, factor, saturation } = useControls(
    "Stars ⭐️",
    {
      count: { value: 2000, min: 1000, max: 5000, step: 100 },
      speed: { value: 3.5, min: 0, max: 10, step: 0.1 },
      factor: { value: 1.5, min: 0, max: 10, step: 0.1 },
      saturation: { value: 0, min: 0, max: 1, step: 0.1 },
    },
    {
      collapsed: true,
    }
  );

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Stars
        fade
        speed={speed}
        count={count}
        factor={factor}
        saturation={saturation}
      />
      <Sky />
      <Floor />
    </KeyboardControls>
  );
};

export default World;
