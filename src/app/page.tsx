'use client';

import React, { useEffect, useState } from 'react';
import ThreeScene from './component/ThreeScene';
import '/src/app/globals.css';

const Icon = (logoIcon: string, onClick: () => void) => (
    <div
        onClick={onClick}
        style={{
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '2px solid black',
            cursor: 'pointer',
        }}
    >
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{logoIcon}</span>
    </div>
);

const HomePage: React.FC = () => {
    const [switchCar, setSwitchCar] = useState(1);
    const maxCars = 5;

    const handleNextCar = () => {
        setSwitchCar((prevCar) => (prevCar < maxCars ? prevCar + 1 : 1));
    };

    const handlePrevCar = () => {
        setSwitchCar((prevCar) => (prevCar > 1 ? prevCar - 1 : maxCars));
    };

    useEffect(() => {
        console.log(`Current car: ${switchCar}`);
    }, [switchCar]);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '15%',
                flexDirection: 'column',
            }}>
                <h1 style={{ fontSize: '40px', fontWeight: 'bolder' }}>Choose Your Car!!</h1>
            </div>
            <div style={{
                width: '100%',
                height: '85%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '30px',
                paddingRight: '30px',
            }}>
                {Icon("<", handlePrevCar)}
                <ThreeScene carId={switchCar.toString()} />
                {Icon(">", handleNextCar)}
            </div>
        </div>
    );
};

export default HomePage;
