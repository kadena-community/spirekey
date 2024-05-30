'use client';

import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { InstancedTriangle } from './InstancedTriangle';

const BLOCK_WIDTH = 1;

interface SceneProps {
  width: number;
  height: number;
}

export function Scene({ width, height }: SceneProps) {
  const { camera, gl } = useThree();
  camera.position.z = 13;

  const numColumns = width / BLOCK_WIDTH - 1;
  const numRows = height / BLOCK_WIDTH;

  return (
    <>
      <ambientLight intensity={5} />
      <spotLight position={[0, 5, 10]} intensity={200} decay={2} castShadow />
      <OrbitControls args={[camera, gl.domElement]} />

      <group position={[-width / 2, -height / 2, 0]}>
        <InstancedTriangle
          width={BLOCK_WIDTH}
          align={'left'}
          columns={numColumns}
          rows={numRows}
        />
        <group position-z={0}>
          <InstancedTriangle
            width={BLOCK_WIDTH}
            align={'right'}
            columns={numColumns}
            rows={numRows}
          />
        </group>
      </group>
    </>
  );
}
