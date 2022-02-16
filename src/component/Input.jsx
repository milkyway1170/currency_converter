import React, {useState} from 'react';

const Input = (props) => {
    return (
        <input type="number" value={props.amount} onChange={e => props.onChangeCurrencyAmount(e)}/>
    );
};

export default Input;


