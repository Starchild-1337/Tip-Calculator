import React from 'react';

const TipButton = ({value, tipValue, setTipValue, setCustom}) => {
    const handleClick = () => {
        setTipValue(value)
        setCustom('')
    }

    return (
        <button className={value === tipValue ? 'active' : ''} onClick={handleClick}>{value}%</button>
    );
};

export default TipButton;