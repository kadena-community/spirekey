import { useMemo } from 'react';
import { Shape } from 'three';

interface TriangleProps {
  x: number;
  y: number;
  scale?: number;
  width: number;
  align: 'left' | 'right';
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

export function Triangle({
  x,
  y,
  width,
  scale = 1,
  align = 'left',
}: TriangleProps) {
  const args: [any, any] = useMemo(
    () => [
      getTriangleShape(align, width),
      {
        depth: scale * Math.random(),
        bevelEnabled: true,
        bevelSize: 0.05,
        bevelOffset: -0.05,
      },
    ],
    [align, width],
  );

  return (
    <mesh position={[x, y, 0]} receiveShadow castShadow>
      <extrudeGeometry args={args} />
      <meshStandardMaterial color="#0B1D2E" />
    </mesh>
  );
}
