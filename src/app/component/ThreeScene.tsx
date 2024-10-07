'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';  
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';

interface ThreeSceneProps {
    carId: string;
}

const Model = dynamic(() => import('./Model'), {
    ssr: false,
    loading: () => (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="gray" />
        </mesh>
    ),
});

const ThreeScene: React.FC<ThreeSceneProps> = ({ carId }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 300); 

        return () => clearTimeout(timeout); // Clean up timeout on unmount
    }, [carId]);

    return (
        <Canvas camera={{ position: [0, 2, 6], fov: 75 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 25, 10]} intensity={1.2} />
            <directionalLight position={[-10, 25, 10]} intensity={1.0} />
            <directionalLight position={[10, 25, -10]} intensity={1.0} />
            <directionalLight position={[0, 10, -10]} intensity={0.8} />
            <directionalLight position={[0, 0, 10]} intensity={0.8} />

            <motion.group
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                key={carId}
            >
                {loading ? (
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="gray" />
                    </mesh>
                ) : (
                    <Model carId={carId} />
                )}
            </motion.group>

            <OrbitControls />
        </Canvas>
    );
};

export default ThreeScene;
