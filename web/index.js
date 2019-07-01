import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import 'react-app-polyfill/ie9'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router'
import indexRoutes from './routes'
import 'antd/dist/antd.css'
import '../src/font/stylesheet.css'
import './App.scss'

var hist = createBrowserHistory()
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return (
          <Route exact path={prop.path} key={key} component={prop.component} />
        )
      })}
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById('root')
)
