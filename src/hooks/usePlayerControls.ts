import { useKeyboardControls } from "@react-three/drei";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

const usePlayerControls = () => {
  const forwardPressed = useKeyboardControls<Controls>(
    (state) => state.forward
  );
  const leftPressed = useKeyboardControls<Controls>((state) => state.left);
  const rightPressed = useKeyboardControls<Controls>((state) => state.right);
  const backPressed = useKeyboardControls<Controls>((state) => state.back);
  const jumpPressed = useKeyboardControls<Controls>((state) => state.jump);

  return {
    forwardPressed,
    leftPressed,
    rightPressed,
    backPressed,
    jumpPressed,
  };
};

export default usePlayerControls;
