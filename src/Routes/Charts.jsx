import React, { useState } from 'react';
import '../Style/charts.scss';
import { useNavigate } from 'react-router-dom';


export default function Charts() {


    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate('/main');
    };

    return (
        <>
            <div>Charts window</div>
        </>
    )
}