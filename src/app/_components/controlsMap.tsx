import { KeyboardControls } from "@react-three/drei";

export default function ControlsMap({ children }: { children: React.ReactNode }) {
  const controls = [
    { name: "forward", keys: ["KeyW", "ArrowUp"] },
    { name: "backward", keys: ["KeyS", "ArrowDown"] },
    { name: "left", keys: ["KeyA", "ArrowLeft"] },
    { name: "right", keys: ["KeyD", "ArrowRight"] },
    { name: "jump", keys: ["Space"] },
  ];

  return <KeyboardControls map={controls}>{children}</KeyboardControls>;
}
