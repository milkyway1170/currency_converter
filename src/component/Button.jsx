import React from 'react';

const Button = (props) => {
    return (
        <button className="currency-btn" onClick={e => props.onChangeClick(e)}>поменять валюты местами</button>
    );
};

export default Button;