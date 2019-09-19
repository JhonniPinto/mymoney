import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Header from './elements/Header'
import Home from './pages/Home'
import FinancialMovements from './pages/FinancialMovements'


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route exact path='/movimentacoes/:date' component={FinancialMovements} /> 
      </Switch>
    </Router>
  )
}

export default App
