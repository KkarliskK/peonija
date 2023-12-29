import React, { useState } from 'react';
import '../Style/charts.scss';
import { useNavigate } from 'react-router-dom';


export default function Orders() {


    const navigate = useNavigate();

    const navigateToMain = () => {
        navigate('/main');
    };

    return (
        <>
            <div>Orders window</div>
        </>
    )
}