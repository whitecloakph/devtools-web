import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './devtools.scss'

ReactDOM
  .render(
    React.createElement(App),
    window.document.getElementById('root')
  )
//
//if (chrome && chrome.devtools) {
//  chrome.devtools.panels.create(
//    "DevTools",
//    "icon.png",
//    "devtools.html",
//    (panel) => {
//    }
//  )
//}
