/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/rw.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

export function Model(props) {
  const { nodes, materials } = useGLTF('/rw.glb')
  return (
    <group {...props} dispose={null} rotation={[0.4, -0.2, 0]} scale={[2, 2, 2]}>
      <mesh geometry={nodes.RWA3491.geometry} material={materials.SVGMat}>
        <meshStandardMaterial attach='material' color='#ff0' metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh geometry={nodes.RWA3492.geometry} material={materials.SVGMat}>
        <meshStandardMaterial attach='material' color='green' metalness={0} roughness={0.8} />
      </mesh>
      <mesh geometry={nodes.RWA3493.geometry} material={materials.SVGMat}>
        <meshStandardMaterial attach='material' color='orange' metalness={0} roughness={0.8} />
      </mesh>
      <mesh geometry={nodes.RWA3494.geometry} material={materials.SVGMat} scale={[1, 40, 1]} color='orange'>
        <meshStandardMaterial attach='material' color='red' metalness={0} roughness={0.8} />
      </mesh>
      <mesh geometry={nodes.RWA3495.geometry} material={materials.SVGMat} scale={[1, 100, 1]}>
        <meshStandardMaterial attach='material' color='blue' metalness={0} roughness={0.8} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/rw.glb')
