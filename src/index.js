import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './repos'

document.addEventListener(
  "DOMContentLoaded",
  function() {
    ReactDOM.render(
      React.createElement(TodoApp),
      document.getElementById('app')
    )
})
