'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d'; // Import Framer Motion 3D

interface ThreeSceneProps {
    carId: number;
}

const Model: React.FC<{ carId: number }> = ({ carId }) => {
    const { scene } = useGLTF(`/${carId}/scene.gltf`);

    // Centering the model and adjusting the rotation
    scene.position.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.rotation.set(0, Math.PI / 2, 0); // Rotate 90 degrees around the Y-axis

    return <primitive object={scene} />;
};

const ThreeScene: React.FC<ThreeSceneProps> = ({ carId }) => {
    const [loading, setLoading] = useState(true);

    const { scene } = useGLTF(`/${carId}/scene.gltf`, true);

    useEffect(() => {
        setLoading(true);

        const model = scene;
        if (model) {
            setTimeout(() => {
                setLoading(false);
            }, 300); // Duration before the new model appears
        }
    }, [carId, scene]);

    return (
        <Canvas camera={{ position: [0, 2, 6], fov: 75 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 25, 10]} intensity={1.2} />
            <directionalLight position={[-10, 25, 10]} intensity={1.0} />
            <directionalLight position={[10, 25, -10]} intensity={1.0} />
            <directionalLight position={[0, 10, -10]} intensity={0.8} />
            <directionalLight position={[0, 0, 10]} intensity={0.8} />

            {/* Framer Motion group for 3D object transition */}
            <motion.group
                initial={{ opacity: 0, scale: 0.8 }} // Initial state (fading out, slightly smaller)
                animate={{ opacity: 1, scale: 1 }}   // Animate to visible and full scale
                exit={{ opacity: 0, scale: 0.8 }}    // Exit (fade out and shrink)
                transition={{ duration: 0.5 }}       // Duration of the animation
                key={carId} // React needs the key to properly track transitions
            >
                {loading ? (
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="gray" />
                    </mesh>
                ) : (
                    <Model key={carId} carId={carId} />
                )}
            </motion.group>

            <OrbitControls />
        </Canvas>
    );
};

export default ThreeScene;
