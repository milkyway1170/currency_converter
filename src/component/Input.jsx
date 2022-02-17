import React from 'react';

const Input = (props) => {
  return (
    <input className="currency-input" type="number" value={props.amount} onChange={e => props.onChangeCurrencyAmount(e)}/>
  );
};

export default Input;