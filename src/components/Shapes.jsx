import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";

const transition = {
  type: "spring",
  duration: 0.7,
  bounce: 0.2
};

export default function Shapes({isHover, isPress}) {
  return(
    <Canvas  shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <MotionConfig transition={transition}>
        <Lights />
        <motion.group
          initial={false}
          animate={isHover ? "hover" : "rest"}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 }
          }}
        >
          <motion.mesh 
            position={[-0.5, -0.5, 0]} variants={{ hover: { z: 2 } }}>
            <sphereGeometry args={[0.4]} />
            <Material />
          </motion.mesh>
          <motion.mesh 
            position={[-0.8, 0.4, 0]}
            rotation={[-0.5, 0, -0.3]}
            variants={{
              hover: {
                z: 1.1,
                x: -1.5,
                rotateX: -0.2,
                rotateZ: 0.4
              }
            }}
          >
            <coneGeometry args={[0.3, 0.6, 20]}  />
            <Material />
          </motion.mesh>
          <motion.mesh 
            position={[0.1, 0.4, 0]}
            rotation={[-0.5, 0, -0.1]}
            variants={{
              hover: {
                z: 2.1,
                y: 0.7,
                rotateY: -0.7,
              }
            }}>
          <torusGeometry args={[0.2, 0.1, 10, 50]} />
          <Material />
          </motion.mesh>
          <motion.mesh 
            position={[1.1, 0, 0]}
            rotation-z={0.5}
            variants={{
              hover: {
                x: 1.8,
                z: 0.6,
                y: 0.6,
                rotateZ: -0.5
              }
            }}
          >
            <icosahedronGeometry args={[0.7, 0]} />
            <Material />
          </motion.mesh>

        </motion.group>
      </MotionConfig>
    </Canvas>
  )
}
function Material() {
  return <meshPhongMaterial color="#fff" specular="#61dafb" shininess={50} />;
}
function Lights() {
  return (
    <>
      <spotLight color="#20c20e" position={[-10, -10, -10]} intensity={0.2} />
      <spotLight color="#20c20e" position={[-10, 0, 15]} intensity={0.8} />
      <spotLight color="#20c20e" position={[-5, 20, 2]} intensity={1.5} />
      <spotLight color="#062602" position={[15, 10, -2]} intensity={2} />
      <spotLight color="#062602" position={[15, 10, 5]} intensity={2} />
      <spotLight color="#fff" position={[5, -10, 5]} intensity={0.4} />
    </>
  );
}