import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

const RecipientRoutes = () => (
  <Switch>
    <Route
      component={() => (<h1>Detalhe do recebedor</h1>)}
      exact
      path="/recipient/:id"
    />
    <Route
      path="/recipient"
      component={() => (<h1>Listagem dos recebedores</h1>)}
    />
  </Switch>
)

export default RecipientRoutes
