import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StartPage from './views/StartPage'
import TransHistoryPage from './views/TransHistoryPage'
import TransactionPage from './views/TransactionPage'
const App = () => {
  let vh = window.innerHeight * 0.01;  
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  const [darkmode, setDarkmode] = useState(false)
  document.querySelector('body').addEventListener("keyup", (e)=> {
    if(e.keyCode === 192) setDarkmode(!darkmode)
  })
  return (
    <Router>
      <div className={darkmode ? 'App dark-mode' : 'App'}>
        {/* <Header /> */}
        <main>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/mina-transaktioner" component={TransHistoryPage} />
            <Route exact path="/enskild-transaktion" component={TransactionPage} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
