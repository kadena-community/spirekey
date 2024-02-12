import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Object3D, Shape } from 'three';

const tempBox = new Object3D();

interface InstancedTriangleProps {
  scale?: number;
  width: number;
  align: 'left' | 'right';
  columns: number;
  rows: number;
  isAnimated?: boolean;
}

function getTriangleShape(align: 'left' | 'right', width: number) {
  const triangle = new Shape();
  triangle.moveTo(0, 0);
  if (align === 'left') {
    triangle.lineTo(width, 0);
    triangle.lineTo(width, width);
  } else {
    triangle.lineTo(0, width);
    triangle.lineTo(width, width);
  }
  triangle.lineTo(0, 0);
  return triangle;
}

export function InstancedTriangle({
  width,
  scale = 0.5,
  align = 'left',
  columns = 10,
  rows = 10,
  isAnimated = true,
}: InstancedTriangleProps) {
  const ref = useRef<any>(null);
  const randomRef = useRef(new Float32Array(columns * rows));
  const args: [any, any] = useMemo(
    () => [
      getTriangleShape(align, width),
      {
        depth: 1,
        bevelEnabled: true,
        bevelSize: 0.05,
        bevelOffset: -0.05,
      },
    ],
    [align, width],
  );

  useLayoutEffect(() => {
    if (ref.current === null) return;

    let counter = 0;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < columns; ++j) {
        const id: number = counter++;
        const randomSeed = Math.random();
        tempBox.position.set(i * width, j * width, 0);
        tempBox.scale.setZ(1);
        tempBox.updateMatrix();

        ref.current.setMatrixAt(id, tempBox.matrix);
        randomRef.current[id] = randomSeed;
      }
    }

    ref.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current === null || !isAnimated) return;

    let counter = 0;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < columns; ++j) {
        const id: number = counter++;
        tempBox.position.set(i * width, j * width, 0);
        tempBox.scale.setZ(
          scale *
            (Math.sin(
              clock.elapsedTime * 0.2 + randomRef.current[id] * 2 * Math.PI,
            ) +
              1),
        );
        tempBox.updateMatrix();
        ref.current.setMatrixAt(id, tempBox.matrix);
      }
    }

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null as any, null as any, columns * rows]}
      receiveShadow
      castShadow
    >
      <extrudeGeometry args={args} />
      <meshStandardMaterial color="#0B1D2E" />
    </instancedMesh>
  );
}
