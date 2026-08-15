import * as THREE from "three"

export type Key = {
  pos: [number, number, number]
  target: [number, number, number]
  fov: number
}

export const PATH: Key[] = [
  { pos: [0, 2.0, 14], target: [0, 2.0, 0], fov: 50 },
  { pos: [0, 2.2, 8], target: [0, 2.0, -2], fov: 46 },
  { pos: [2.6, 2.3, -2], target: [0, 2.0, -10], fov: 44 },
  { pos: [-2.6, 2.3, -10], target: [0, 2.0, -18], fov: 44 },
  { pos: [2.6, 2.4, -18], target: [0, 2.2, -26], fov: 42 },
  { pos: [0, 2.6, -28], target: [0, 2.4, -36], fov: 40 },
  { pos: [0, 3.0, -40], target: [0, 2.4, -48], fov: 42 },
  { pos: [3.4, 3.0, -50], target: [0, 3.0, -58], fov: 46 },
  { pos: [0, 2.6, -64], target: [0, 2.6, -74], fov: 50 },
]

export type CamState = { pos: THREE.Vector3; target: THREE.Vector3; fov: number }

export function sample(progress: number, out: CamState): CamState {
  const n = PATH.length - 1
  const p = THREE.MathUtils.clamp(progress, 0, 1) * n
  const i = Math.min(Math.floor(p), n - 1)
  const t = p - i
  const a = PATH[i]
  const b = PATH[i + 1]
  out.pos.set(
    THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
    THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
    THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
  )
  out.target.set(
    THREE.MathUtils.lerp(a.target[0], b.target[0], t),
    THREE.MathUtils.lerp(a.target[1], b.target[1], t),
    THREE.MathUtils.lerp(a.target[2], b.target[2], t),
  )
  out.fov = THREE.MathUtils.lerp(a.fov, b.fov, t)
  return out
}
