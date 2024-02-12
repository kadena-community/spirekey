interface BlockProps {
  x: number;
  y: number;
  scale?: number;
  width: number;
}

export function Block({ x, y, width, scale = 1.5 }: BlockProps) {
  return (
    <mesh position={[x, y, 0]} receiveShadow castShadow>
      <boxGeometry args={[width, width, scale * Math.random()]} />
      <meshPhysicalMaterial color="#0B1D2E" />
    </mesh>
  );
}
