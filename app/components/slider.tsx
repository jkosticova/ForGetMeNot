import React, { useState } from 'react';

type SliderProps = {
    min: number;
    max: number;
    step: number;
    value: number;  // Controlled value prop
    onChange: (value: number) => void;
    label: string;
    disabled?: boolean;
};

export const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange, label, disabled }) => {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) { // Only call onChange if not disabled
            const newValue = parseInt(e.target.value);
            onChange(newValue);
        }
    };

    return (
        <div className="flex flex-col justify-between md:flex-row">
            <div>{label}:</div>
            <input
                type="range"
                className="min-w-[15vw]"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleSliderChange}
                disabled={!onChange} // Optionally, disable slider if onChange is undefined
            />
        </div>
    );
};
