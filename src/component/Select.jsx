import React from 'react';


const Select = (props) => {
    //upload currency list in option
    const CurrencyNameList = Object.keys(props.currencyRate)
    .map((сurrencyNameItem, key) =>
        <option key={key} value={сurrencyNameItem}>
            {сurrencyNameItem}
        </option>
    );

    return (
        <select onChange={e => props.onChangeCurrencyName(e)}>
            {CurrencyNameList}
        </select>
    );
};

export default Select;