"use client";

import { Billboard, Text } from "@react-three/drei";

export default function TextBoard({ text, position }: { text: string; position: [number, number, number] }) {
  return (
    <Billboard position={position}>
      <Text color={"black"} fontSize={0.12} fontWeight={"bold"}>
        {text}
      </Text>
    </Billboard>
  );
}
