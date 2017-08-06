import React, {Component} from 'react'
import {Search} from './components/search.jsx'

class App extends Component {
  render () {
    return (
      <div>
        <h2 className='demo-title'>Tree lookup</h2>
        <div className='demo-area'>
          <Search />
        </div>
      </div>
    )
  }
}

export default App
