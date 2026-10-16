"use client";

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Avatar25D } from "@/components/home/Avatar25D";

const GLB_URL = "/avatar/detim-avatar.glb";

/**
 * Tier-2 real-3D avatar (Master Prompt §5.2), enabled only with
 * `NEXT_PUBLIC_AVATAR_3D=true`. Loads the GLB with @react-three/fiber +
 * drei; the head/body gently follows the cursor with limited rotation;
 * soft key light + orange rim lights. On any load failure it falls
 * back to the Tier-1 2.5D avatar.
 */
class Avatar3DErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    console.warn("Avatar3D failed — falling back to the 2.5D avatar.");
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function FollowingBust({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(GLB_URL);
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const scale = 2.2 / Math.max(size.x, size.y, size.z);
    scene.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3()).multiplyScalar(scale);
    scene.position.sub(center);
    onReady();
  }, [scene, onReady]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const t = 1 - Math.pow(0.001, delta); // frame-rate independent lerp
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.3,
      t
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.18,
      t
    );
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export default function Avatar3D() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative mx-auto h-[46vh] w-full max-w-[430px] lg:h-[62vh]">
      {/* Tier-1 visible underneath until the GLB is ready */}
      <div className={ready ? "hidden" : "block"}>
        <Avatar25D />
      </div>

      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.2, 3], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          {/* soft white key light */}
          <directionalLight position={[3, 4, 4]} intensity={2.2} color="#FFF4EC" />
          {/* orange rim lights */}
          <pointLight position={[-4, 2, -3]} intensity={30} color="#FF5A1F" />
          <pointLight position={[4, 1.5, -2.5]} intensity={18} color="#D9480F" />
          <Suspense fallback={null}>
            <FollowingBust onReady={() => setReady(true)} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
