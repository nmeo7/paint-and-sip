// import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Model } from './Rw'




export const Box = ({ styles, branch = 'NORTH', onHover }) => {
  const [internalBranch, setInternalBranch] = useState(branch)
  const colors = { Kigali: 'orange', Musanze: 'yellow', Rwamagana: 'red', Huye: 'cyan', Rubavu: 'green', Rusizi: 'blue' }
  const cameraRef = useRef()

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {Object.keys(colors).map((b, i) => (
          <p key={i}
            style={{ color: b == internalBranch && '#a47e30', fontWeight: b == internalBranch && 'bold', cursor: 'pointer' }}
            onMouseOver={() => setInternalBranch(b)}
            onClick={() => onHover(b)}>
            {b}
          </p>
        ))}
      </div>
      <Canvas style={{ backgroundColor: '', height: '300px', width: '400px', ...styles }}>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={3} // Adjust 'fov' for focal length
          position={[0, 0, 100]} // Adjust position to frame your scene
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
      </Canvas>
    </div>
  )
}
