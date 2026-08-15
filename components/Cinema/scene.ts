import * as THREE from "three"

const INK = 0x0a0c10
const CHARCOAL = 0x11161f
const ARCH = 0x1c2230
const AMBER = 0xd89a4a
const BONE = 0xf3ece0
const VERMILION = 0xc8462f
const ROSE = 0xb8656a
const FABRIC = 0x3a2a3a

export type SceneHandle = {
  group: THREE.Group
  update: (t: number) => void
  dispose: () => void
}

const dummy = new THREE.Object3D()

function arch(z: number, mat: THREE.Material): THREE.Group {
  const g = new THREE.Group()
  const tube = new THREE.TorusGeometry(2.2, 0.09, 8, 28, Math.PI)
  const mesh = new THREE.Mesh(tube, mat)
  mesh.position.set(0, 0, z)
  g.add(mesh)
  const post = new THREE.CylinderGeometry(0.09, 0.09, 0.6, 8)
  const lp = new THREE.Mesh(post, mat)
  lp.position.set(-2.2, -0.3, z)
  const rp = lp.clone()
  rp.position.x = 2.2
  g.add(lp, rp)
  return g
}

export function buildScene(): SceneHandle {
  const group = new THREE.Group()

  const matArch = new THREE.MeshStandardMaterial({ color: ARCH, roughness: 0.7, metalness: 0.1 })
  const matFabric = new THREE.MeshStandardMaterial({ color: FABRIC, roughness: 0.9 })
  const matWarm = new THREE.MeshStandardMaterial({ color: 0x2a2030, roughness: 0.8 })
  const matAmber = new THREE.MeshStandardMaterial({ color: 0x2a2018, emissive: AMBER, emissiveIntensity: 1.1, roughness: 0.5 })
  const matRose = new THREE.MeshStandardMaterial({ color: 0x3a2230, emissive: ROSE, emissiveIntensity: 1.0, roughness: 0.5 })
  const matBone = new THREE.MeshStandardMaterial({ color: BONE, emissive: BONE, emissiveIntensity: 0.6, roughness: 0.4 })
  const matMoon = new THREE.MeshBasicMaterial({ color: VERMILION })

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(220, 460),
    new THREE.MeshStandardMaterial({ color: CHARCOAL, roughness: 1, metalness: 0 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.z = -80
  group.add(ground)

  const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(7, 40, 40), matMoon)
  moonMesh.position.set(-16, 16, -86)
  group.add(moonMesh)

  const flowers: THREE.InstancedMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.13, 6, 6),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0x331020, emissiveIntensity: 0.4 }),
    9 * 16,
  )
  const fColors = [ROSE, AMBER, BONE, 0xe8b974, 0xd98aa0]
  let fi = 0
  for (let a = 0; a < 9; a++) {
    const z = 10 - a * 2.2
    for (let k = 0; k < 16; k++) {
      const ang = (k / 16) * Math.PI
      const r = 2.2 + (Math.random() - 0.5) * 0.25
      dummy.position.set(Math.cos(ang) * r, Math.sin(ang) * r + (Math.random() - 0.5) * 0.2, z)
      const s = 0.7 + Math.random() * 0.7
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      flowers.setMatrixAt(fi, dummy.matrix)
      flowers.setColorAt(fi, new THREE.Color(fColors[fi % fColors.length]))
      fi++
    }
  }
  flowers.instanceMatrix.needsUpdate = true
  if (flowers.instanceColor) flowers.instanceColor.needsUpdate = true
  for (let a = 0; a < 9; a++) group.add(arch(10 - a * 2.2, matArch))
  group.add(flowers)

  const frames: { mesh: THREE.Mesh; base: THREE.Vector3; phase: number }[] = []
  for (let i = 0; i < 6; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 8, 32), matAmber)
    ring.position.set((i % 2 ? 1 : -1) * (2.4 + i * 0.1), 3.2, -10 - i * 1.1)
    ring.rotation.y = Math.PI / 2
    group.add(ring)
    frames.push({ mesh: ring, base: ring.position.clone(), phase: i })
  }

  const couch = new THREE.Group()
  const base = new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 1.4), matFabric)
  base.position.y = 0.25
  const back = new THREE.Mesh(new THREE.BoxGeometry(3, 1.1, 0.3), matFabric)
  back.position.set(0, 0.8, -0.55)
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.7, 1.4), matFabric)
  armL.position.set(-1.35, 0.6, 0)
  const armR = armL.clone(); armR.position.x = 1.35
  couch.add(base, back, armL, armR)
  couch.position.set(0, 0, -20)
  couch.rotation.y = 0.2
  group.add(couch)

  const flames: THREE.Mesh[] = []
  for (let i = 0; i < 6; i++) {
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), matAmber)
    f.position.set(-1.6 + i * 0.6, 1.1, -18.6 + (i % 2) * 0.3)
    group.add(f)
    flames.push(f)
  }

  const balloons = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.34, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, emissive: 0x222030, emissiveIntensity: 0.3 }),
    26,
  )
  let bi = 0
  const bColors = [ROSE, AMBER, BONE, 0xe8b974, 0xd98aa0]
  for (let i = 0; i < 26; i++) {
    const ang = (i / 26) * Math.PI
    dummy.position.set(Math.cos(ang) * 3.0, Math.sin(ang) * 2.4 + 0.6, -30)
    dummy.scale.setScalar(0.6 + (i % 3) * 0.15)
    dummy.updateMatrix()
    balloons.setMatrixAt(bi, dummy.matrix)
    balloons.setColorAt(bi, new THREE.Color(bColors[i % bColors.length]))
    bi++
  }
  balloons.instanceMatrix.needsUpdate = true
  if (balloons.instanceColor) balloons.instanceColor.needsUpdate = true
  group.add(balloons)
  const dessert = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.8), matWarm)
  dessert.position.set(0, 0.3, -32)
  group.add(dessert)

  const throne = new THREE.Group()
  const plat = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 3), matWarm)
  plat.position.set(0, 0.2, -44)
  const drape = new THREE.Mesh(new THREE.PlaneGeometry(5, 4), matRose)
  drape.position.set(0, 2, -46)
  throne.add(plat, drape)
  group.add(throne)
  const uplighters: THREE.Mesh[] = []
  for (let i = 0; i < 4; i++) {
    const u = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), matRose)
    u.position.set(-1.6 + i * 1.06, 0.45, -43)
    group.add(u)
    uplighters.push(u)
  }

  const table = new THREE.Mesh(new THREE.BoxGeometry(8, 0.3, 1.6), matFabric)
  table.position.set(0, 0.7, -58)
  group.add(table)
  const chairs = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.5, 0.9, 0.5),
    matWarm,
    20,
  )
  for (let i = 0; i < 20; i++) {
    const side = i < 10 ? 1 : -1
    dummy.position.set(-3.5 + (i % 10) * 0.78, 0.45, -58 + side * 1.4)
    dummy.updateMatrix()
    chairs.setMatrixAt(i, dummy.matrix)
  }
  chairs.instanceMatrix.needsUpdate = true
  group.add(chairs)
  const candelabra: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 0.9, 8), matAmber)
    c.position.set(-2.6 + i * 2.6, 1.25, -58)
    group.add(c)
    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), matAmber)
    fl.position.set(-2.6 + i * 2.6, 1.85, -58)
    group.add(fl)
    candelabra.push(fl)
  }

  const stage = new THREE.Group()
  const prosc = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.12, 8, 32, Math.PI), matArch)
  prosc.position.set(0, 4, -68)
  stage.add(prosc)
  const pl = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5, 8), matWarm)
  pl.position.set(0, 2.5, -68)
  stage.add(pl)
  group.add(stage)
  const pendants: THREE.Mesh[] = []
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), matBone)
    p.position.set(-2 + i * 1, 4.2, -66 - i * 0.2)
    group.add(p)
    pendants.push(p)
  }

  const tent = new THREE.Group()
  const cone = new THREE.Mesh(new THREE.ConeGeometry(5, 3, 8, 1, true), matFabric)
  cone.position.set(0, 4, -82)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 5, 8), matWarm)
  pole.position.set(0, 2.5, -82)
  tent.add(cone, pole)
  group.add(tent)
  const stars: THREE.Mesh[] = []
  for (let i = 0; i < 18; i++) {
    const st = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6), matBone)
    st.position.set((Math.random() - 0.5) * 8, 3 + Math.random() * 3, -80 - Math.random() * 6)
    group.add(st)
    stars.push(st)
  }

  const PN = 70
  const petals = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.26, 0.34),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, side: THREE.DoubleSide, emissive: 0x331020, emissiveIntensity: 0.2 }),
    PN,
  )
  const pData: { x: number; y: number; z: number; s: number; v: number; r: number; rs: number }[] = []
  const pColors = [ROSE, AMBER, BONE, 0xd98aa0]
  for (let i = 0; i < PN; i++) {
    const x = (Math.random() - 0.5) * 14
    const y = 1 + Math.random() * 8
    const z = 12 - Math.random() * 96
    pData.push({ x, y, z, s: 0.6 + Math.random() * 0.8, v: 0.4 + Math.random() * 0.5, r: Math.random() * Math.PI, rs: (Math.random() - 0.5) * 1.2 })
    petals.setColorAt(i, new THREE.Color(pColors[i % pColors.length]))
  }
  if (petals.instanceColor) petals.instanceColor.needsUpdate = true
  group.add(petals)

  const update = (t: number) => {
    for (let i = 0; i < PN; i++) {
      const p = pData[i]
      p.y -= p.v * 0.016
      p.r += p.rs * 0.016
      if (p.y < 0.1) { p.y = 9 + Math.random() * 2; p.z = 12 - Math.random() * 96; p.x = (Math.random() - 0.5) * 14 }
      dummy.position.set(p.x, p.y, p.z)
      dummy.rotation.set(p.r, p.r * 0.5, 0)
      dummy.scale.setScalar(p.s)
      dummy.updateMatrix()
      petals.setMatrixAt(i, dummy.matrix)
    }
    petals.instanceMatrix.needsUpdate = true
    const fl = 1 + Math.sin(t * 9) * 0.18 + Math.sin(t * 23) * 0.08
    for (const f of flames) f.scale.setScalar(fl)
    for (const c of candelabra) c.scale.setScalar(1 + Math.sin(t * 11 + c.position.x) * 0.2)
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]
      s.scale.setScalar(0.7 + Math.sin(t * 2 + i) * 0.4)
    }
    for (let i = 0; i < pendants.length; i++) {
      pendants[i].rotation.y = Math.sin(t * 0.6 + i) * 0.25
    }
    for (const fr of frames) {
      fr.mesh.position.x = fr.base.x + Math.sin(t * 0.5 + fr.phase) * 0.12
      fr.mesh.position.y = fr.base.y + Math.sin(t * 0.7 + fr.phase) * 0.08
    }
  }

  const dispose = () => {
    group.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const m = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(m)) m.forEach((x) => x.dispose())
      else if (m) m.dispose()
    })
  }

  return { group, update, dispose }
}
