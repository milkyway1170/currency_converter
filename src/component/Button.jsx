import React from 'react';

const Button = (props) => {
    return (
        <button onClick={e => props.onChangeClick(e)}>поменять валюты местами</button>
    );
};

export default Button;