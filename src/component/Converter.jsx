import React, {useState, useEffect} from 'react'
import Select from './Select'
import Input from './Input'
import Button from './Button'

const Converter = () => {
    const [currencyRate, setCurrencyRate] = useState([])
    const [fromCurrencyName, setFromCurrencyName] = useState('RUB')
    const [toCurrencyName, setToCurrencyName] = useState('RUB')
    const [fromAmount, setFromAmount] = useState('1')
    const [toAmount, setToAmount] = useState('1')

    console.log('render App')
    // console.log(fromCurrencyName)

    useEffect(() => {
        fetch('http://data.fixer.io/api/latest?access_key=d91ec070a67d1e484b172fcb3b734f9f').then((response) => {
            return response.json();
        })
        .then((data) => {
            setCurrencyRate(data.rates);
            console.log('get from Api')
        });
    }, []);


    const handleChangeFromCurrencyName = (e) => {setFromCurrencyName(e.target.value)}
    const handleChangeToCurrencyName = (e) => {setToCurrencyName(e.target.value)}

    const handleChangeFromCurrencyAmount = (e) => {
        setFromAmount(e.target.value);
        setToAmount(Convert(getRate(fromCurrencyName),getRate(toCurrencyName), e.target.value))
    }
    const handleChangeToCurrencyAmount = (e) => {
        setToAmount(e.target.value);
        setFromAmount(Convert(getRate(toCurrencyName),getRate(fromCurrencyName), e.target.value))
    }
    
    const handleChangeSwap = (e) => {
        const bufferName = fromCurrencyName;
        setFromCurrencyName(toCurrencyName);
        setToCurrencyName(bufferName);
        const bufferAmount = fromAmount;
        setFromAmount(toAmount);
        setToAmount(bufferAmount);
    }

    const getRate = (currencyName) => {
        return (currencyRate[currencyName]);
    }

    // //converter from first currency to second currency using rounding to hundredths
    function Convert(fromCurrencyRate, toCurrencyRate, fromAmount){
        const toAmount = (fromAmount/fromCurrencyRate)*toCurrencyRate
        return toAmount.toFixed(2);
    }

    
    return (
    <div className="App">
        <Select 
            currencyRate = {currencyRate}
            onChangeCurrencyName={handleChangeFromCurrencyName}
            currencyName = {fromCurrencyName}
        />
        <Select
            currencyRate = {currencyRate}
            onChangeCurrencyName={handleChangeToCurrencyName}
            currencyName = {toCurrencyName}
        />
        <Input 
            amount = {fromAmount}
            onChangeCurrencyAmount={handleChangeFromCurrencyAmount}
        />
        <Input 
            amount = {toAmount}
            onChangeCurrencyAmount={handleChangeToCurrencyAmount}
        />
        <Button onChangeClick = {handleChangeSwap}/>
    </div>
    );
};

export default Converter;