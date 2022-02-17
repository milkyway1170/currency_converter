import React, {useState, useEffect} from 'react'
import Select from './Select'
import Input from './Input'
import Button from './Button'
import './Converter.css';

const Converter = () => {
  const [currencyRate, setCurrencyRate] = useState([])
  const [fromCurrencyName, setFromCurrencyName] = useState('RUB')
  const [toCurrencyName, setToCurrencyName] = useState('RUB')
  const [fromAmount, setFromAmount] = useState('1')
  const [toAmount, setToAmount] = useState('1')

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+process.env.REACT_APP_API_KEY).then((response) => {
      return response.json();
    })
    .catch(error => alert(error.message))
    .then((data) => {
      setCurrencyRate(data.rates);
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

  function Convert(fromCurrencyRate, toCurrencyRate, fromAmount){
    const toAmount = (fromAmount/fromCurrencyRate)*toCurrencyRate
    return toAmount.toFixed(2);
  }

  return (
    <div className="converte-container">
      <h1 className="container-name">Конвертер валют</h1>
      <div className="select-container">
        <p className="container-text">Вы переводите из</p>
        <Select 
          currencyRate = {currencyRate}
          onChangeCurrencyName={handleChangeFromCurrencyName}
          currencyName = {fromCurrencyName}
        />
        <p className="container-text">в</p>
        <Select
          currencyRate = {currencyRate}
          onChangeCurrencyName={handleChangeToCurrencyName}
          currencyName = {toCurrencyName}
        />
      </div>
      <div className="input-container">
        <Input 
          amount = {fromAmount}
          onChangeCurrencyAmount={handleChangeFromCurrencyAmount}
        />
        <p className="container-text">=</p>
        <Input 
          amount = {toAmount}
          onChangeCurrencyAmount={handleChangeToCurrencyAmount}
        />
      </div>
      <Button onChangeClick = {handleChangeSwap}/>
    </div>
  );
};

export default Converter;