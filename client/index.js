require('babel-polyfill')
import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Main from './Main'

const Root = () => <Main />

const el = document.getElementById('app')

ReactDOM.render(<Root />, el)
