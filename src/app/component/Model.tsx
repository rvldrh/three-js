import React from 'react';
import { useGLTF } from '@react-three/drei';

interface ModelProps {
    carId: string;
}

const Model: React.FC<ModelProps> = ({ carId }) => {
    const path = `/${carId}/scene.gltf`;

    const { scene } = useGLTF(path);
    scene.position.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} />;
};

export default Model;
