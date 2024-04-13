"use client";

import { Billboard, Text } from "@react-three/drei";

export default function TextBoard({ text }: { text: string }) {
  return (
    <Billboard position={[0, 1.6, 0]}>
      <Text color={"black"} fontSize={0.12} fontWeight={"bold"}>
        {text}
      </Text>
    </Billboard>
  );
}
