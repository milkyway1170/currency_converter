import React, {useState, useEffect} from 'react'
import Select from './Select';
import Input from './Input'

const Converter = () => {
    const [currencyRate, setCurrencyRate] = useState([])
    const [fromCurrencyName, setFromCurrencyName] = useState('RUB')
    const [toCurrencyName, setToCurrencyName] = useState('RUB')
    const [fromCurrencyValue, setFromCurrencyValue] = useState('')
    const [toCurrencyValue, setToCurrencyValue] = useState('')

    console.log('render App')
    // console.log(fromCurrencyName)

    useEffect(() => {
        fetch('http://data.fixer.io/api/latest?access_key=14d17c7898d5b5393a8b1cfc3cb47473&format=1').then((response) => {
            return response.json();
        })
        .then((data) => {
            setCurrencyRate(data.rates);
            console.log('get from Api')
        });
        setFromCurrencyValue (getRate(fromCurrencyName));
        setToCurrencyValue (getRate(toCurrencyName));
    }, []);


    const handleChangeFromCurrencyName = (e) => {setFromCurrencyName(e.target.value)}
    const handleChangeToCurrencyName = (e) => {setToCurrencyName(e.target.value)}
    

    const getRate = (currencyName) => {
        return (currencyRate[currencyName]);
    }

    // //converter from first currency to second currency using rounding to hundredths
    // function Convert(fromCurrencyRate, toCurrencyRate, fromAmount){
    //     const toAmount = (fromAmount/fromCurrencyRate)*toCurrencyRate
    //     return toAmount.toFixed(2);
    // }

    
    return (
    <div className="App">
        <Select currencyRate = {currencyRate} onChangeCurrencyName={handleChangeFromCurrencyName}/>
        <Select currencyRate = {currencyRate} onChangeCurrencyName={handleChangeToCurrencyName}/>
        <Input currencyValue = {fromCurrencyValue}/>
        <Input currencyValue = {toCurrencyValue}/>
    </div>
    );
};

export default Converter;