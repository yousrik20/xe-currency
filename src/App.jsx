
import { Container,Typography,Grid, Box, Button} from '@mui/material';
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from './context/CurrencyContext';
import axios from 'axios';


function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  }=useContext(CurrencyContext);
  const [resultCurrency,setResultCurrency]=useState(0);
  const codeFromCurrency=fromCurrency.split(" ")[0];
  const codeToCurrency=toCurrency.split(' ')[0];
  console.log(resultCurrency);
  useEffect(()=>{
    if(firstAmount){
      axios('https://api.freecurrencyapi.com/v1/latest',{
        params:{
          apikey:'fca_live_VectUX7wDkAetiFqjtFGn6bIEb6RlRoc6pcHXlZG',
          base_currency:codeFromCurrency,
          currencies:codeToCurrency
        }
      })
      .then(response=>setResultCurrency(response.data.data[codeToCurrency]))
      .catch(error=>console.log(error))
    }
  },[firstAmount,fromCurrency,toCurrency])
  const boxStyles={
    backgroundColor:"#fdfdfd",
    marginTop:"10rem",
    textAlign:"center",
    color:"#222",
    minHeight:"20rem",
    borderRadius:2,
    padding:"4rem 2rem",
    boxShadow:"0px 10px 15px -3px rgba(0,0,0,0.1)",
    position:"relative"
  }
  return (
    <Container maxWidth="md" sx={boxStyles}>
        <Typography variant='h5' sx={{mb: "2rem" }}>Stay Ahead Accurate Conversions</Typography>
        <Grid container spacing={2}>
          <InputAmount/>        
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
          <SwitchCurrency/>
          <SelectCountry  value={toCurrency} setValue={setToCurrency} label="To"/>
        </Grid>
        {firstAmount ? (
          <Box sx={{textAlign:"left",marginTop:"1rem"}}>
            <Typography>{firstAmount} {fromCurrency} =</Typography>
            <Typography variant='h5' sx={{marginTop:'5px',fontWeight:"bold"}}>{resultCurrency*firstAmount} {toCurrency}</Typography>
          </Box>
        ):""
      }
    </Container>
  )
}

export default App
