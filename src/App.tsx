import { Suspense } from "react";
import { Environment, Loader, OrbitControls, Stats } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useLocation } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import World from "./components/world/World";

const App = () => {
  const { hash } = useLocation();
  const isDebug = hash.includes("debug");

  return (
    <>
      <Loader />
      <Leva hidden={!isDebug} />
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [30, 70, 50], fov: 50, near: 0.1, far: 1000 }}
        gl={{ antialias: true }}
      >
        <Environment preset="city" />
        <color attach="background" args={["#101010"]} />
        <OrbitControls />
        <Suspense>
          {isDebug && <Stats />}
          <World />
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={1} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
