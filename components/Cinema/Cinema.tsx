"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { sample, type CamState, PATH } from "./cameraPath"
import { buildScene } from "./scene"
import { useReducedMotion, isCoarsePointer, isWeakDevice } from "@/hooks/useReducedMotion"

const PATH_INIT = PATH[0]

export function Cinema() {
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const debugRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (reduced || failed) return
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      })
    } catch {
      setFailed(true)
      return
    }

    const coarse = isCoarsePointer()
    const weak = isWeakDevice()
    const dpr = window.devicePixelRatio || 1
    const pr = Math.min(dpr, weak ? 1 : coarse ? 1.5 : 2)
    renderer.setPixelRatio(pr)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0c10)
    scene.fog = new THREE.FogExp2(0x11161f, 0.04)

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200)

    const hemi = new THREE.HemisphereLight(0xf3ece0, 0x11161f, 0.35)
    scene.add(hemi)
    const moon = new THREE.DirectionalLight(0x8899bb, 0.6)
    moon.position.set(-8, 16, -10)
    scene.add(moon)
    const lantern = new THREE.PointLight(0xd89a4a, 1.2, 18, 2)
    scene.add(lantern)

    const handle = buildScene()
    scene.add(handle.group)

    let composer: EffectComposer | null = null
    const wantBloom = !coarse && !weak
    if (wantBloom) {
      composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.6,
        0.4,
        0.85,
      )
      composer.addPass(bloom)
    }

    const state: CamState = {
      pos: new THREE.Vector3(...PATH_INIT.pos),
      target: new THREE.Vector3(...PATH_INIT.target),
      fov: PATH_INIT.fov,
    }
    const target: CamState = {
      pos: new THREE.Vector3(),
      target: new THREE.Vector3(),
      fov: 50,
    }

    let progress = 0
    let progressTarget = 0
    let raf = 0
    let visible = true
    let needsFrame = true

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressTarget = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      needsFrame = true
    }
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (composer) composer.setSize(w, h)
      needsFrame = true
    }
    const onVisibility = () => {
      visible = !document.hidden
      if (visible) needsFrame = true
    }

    const tick = () => {
      raf = 0
      if (!visible) return
      const damp = 0.08
      progress += (progressTarget - progress) * damp
      sample(progress, target)
      state.pos.lerp(target.pos, damp)
      state.target.lerp(target.target, damp)
      state.fov += (target.fov - state.fov) * damp
      camera.position.copy(state.pos)
      camera.lookAt(state.target)
      camera.fov = state.fov
      camera.updateProjectionMatrix()
      lantern.position.set(state.pos.x + 1.5, state.pos.y + 1, state.pos.z - 2)
      handle.update(performance.now() / 1000)
      if (composer) composer.render()
      else renderer.render(scene, camera)
      if (debugRef.current) {
        debugRef.current.textContent = String(Math.round(progress * 100)) + "%"
      }
      const stillMoving = Math.abs(progressTarget - progress) > 0.0005
      if (stillMoving || needsFrame) {
        needsFrame = false
        raf = requestAnimationFrame(tick)
      }
    }

    onResize()
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      handle.dispose()
      composer?.dispose()
      renderer.dispose()
    }
  }, [reduced, failed])

  if (reduced) return <div className="cinema-poster" aria-hidden="true" />

  return (
    <div id="cinema">
      <canvas ref={canvasRef} />
      <div id="cinema-debug" ref={debugRef} aria-hidden="true" />
      {failed && <div className="cinema-poster" aria-hidden="true" />}
    </div>
  )
}
