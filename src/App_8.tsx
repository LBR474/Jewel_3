import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  MeshRefractionMaterial,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Center,
  PresentationControls,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { GLTF, RGBELoader } from "three-stdlib";




interface RingProps extends React.ComponentProps<"group"> {
  map: THREE.Texture;
}

interface RingGLTF extends GLTF {
  nodes: {
    dobj: THREE.Mesh;
    Circle: THREE.Mesh;
    Circle001: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
}

function Ring({ map, ...props }: RingProps) {
  
  const { nodes, materials } = useGLTF("/dist/models/rings_7.glb") as RingGLTF;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.dobj.geometry} rotation={[Math.PI / 2, 0, 0]}>
        <MeshRefractionMaterial
          envMap={map}
          aberrationStrength={0.02}
          toneMapped={true}
        />
      </mesh>
      <mesh
        rotation={[Math.PI / 1, 0, 0]}
        castShadow
        //receiveShadow
        geometry={nodes.Circle.geometry}
        material={materials["Material.001"]}
        material-envMap={null} // Disable environment reflection
        material-envMapIntensity={0} // Optional: Ensure no reflection
        material-roughness={0.5} // Adjust for a matte finish
      />

      {/* <Html
        position={[0.25, -1, 0.75]}
        scale={0.15}
        rotation={[Math.PI / 2, 0, 0]}
        transform
      >
        <HexColorPicker className="picker" color={color} onChange={setColor} />
      </Html> */}
    </group>
  );
}

export default function App() {
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
  );
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 15], fov: 45, near: 1, far: 30 }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight />
      <Environment map={texture} />
     
        <group position={[0, -2, 0]}>
          <Center top>
            <Ring map={texture} rotation={[-Math.PI / 2.05, 0, 0]} scale={3} />
          </Center>
          <AccumulativeShadows
            temporal
            frames={100}
            alphaTest={0.95}
            opacity={1}
            scale={20}
          >
            <RandomizedLight
              amount={8}
              radius={10}
              ambient={0.5}
              position={[0, 10, -2.5]}
              bias={0.001}
              size={3}
            />
          </AccumulativeShadows>
        </group>
      
      <OrbitControls enableZoom={false}/>
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
