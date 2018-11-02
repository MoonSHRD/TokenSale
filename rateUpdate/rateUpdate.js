// function for updating rate in cents, must be used as: setInterval(updateRate, 60*60*1000)
function updateRate() {                                
    fetch('https://rest.coinapi.io/v1/exchangerate/ETH/USD', 
      {headers : 
        {'X-CoinAPI-Key' : 'F2D316DE-FB4D-4340-9C00-BF0EEDBBD5F0',
        'Accept' : 'application/json'}})
      .then(response => {return response.json()})
      .then(json => {
        if(json.rate) {return json.rate} 
        else {console.log(json.error)}})
      .then(rate => {
        if(!isNaN(rate) && typeof rate === 'number')    // not NaN only number
        {/*place for contractUpdate with rate*100 
           For Example Contract.setRate(parseInt((rate*100).toString()).send({ from: accounts[0] })); */ 
       }})
      .catch(error => {console.log(`Sorry! we have ${error}`)});   // system errors
  };
