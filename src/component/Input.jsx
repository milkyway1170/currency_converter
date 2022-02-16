import React, {useState} from 'react';

const Input = (currencyValue) => {
    // const [amount, setAmount] = useState('1');

    // setAmount(currencyValue)
    console.log(currencyValue)
    return (
        <input type="number" value={currencyValue}/>
    );
};

export default Input;


