import React, { useState } from 'react';

const ColorSlider = ({value}) => {
    
    return (
        <div className="slider-container">
            <p>Sıcaklık: {value} °C</p>
            <input
                type="range"
                min="-100"
                max="100"
                value={value}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="weather-slider"
                disabled
            />
            <div className="slider-labels d-flex justify-content-between">
                <span>-100</span>
                <span>-50</span>
                <span>0</span>
                <span>50</span>
                <span>100</span>
            </div>
        </div>
    );
};

export default ColorSlider;
