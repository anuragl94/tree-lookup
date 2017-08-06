import React, {Component} from 'react'
import TreeLookup from '../lib/treelookup.min.js'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      values: [],
      options: [], // Search results
      loading: false,
      error: null // Error from search API
    }
    this.api = new TreeLookup()
    this.search = this.search.bind(this)
    this.toggleValue = this.toggleValue.bind(this)
    this.removeValue = this.removeValue.bind(this)
  }
  search (term) {
    let _this = this
    this.setState({loading: true})
    this.api.getChildrenAsPromise('/' + term).then(function (rawOptions) {
      console.info(rawOptions)
      let options = rawOptions.map(option => ({
        path: term + '/' + option,
        value: option
      }))
      _this.setState({options, loading: false})
    }).catch(function (error) {
      this.setState({error})
    })
  }
  toggleValue (value) {
    let index = this.state.values.indexOf(value)
    if (index > -1) {
      this.setState(function (prevState) {
        let newState = Object.assign({}, prevState)
        newState.values.splice(index, 1)
        return newState
      })
    } else {
      this.setState(function (prevState) {
        let newState = Object.assign({}, prevState)
        newState.values.push(value)
        return newState
      })
    }
  }
  removeValue (index) {
    this.setState(function (prevState) {
      let newState = Object.assign({}, prevState)
      newState.values.splice(index, 1)
      return newState
    })
  }
  isSelected (value) {
    return (this.state.values.indexOf(value) > -1)
  }
  render () {
    return (
      <div className='multi-search'>
        <input className='select-input' onChange={(e) => { this.search(e.target.value) }} />
        <ul className='selected-tags'>
          {this.state.values.map((value, index) => (
            <li className='selected-tag' key={index}
              onClick={e => this.removeValue(index)}
              >
              {value}
            </li>
            ))}
        </ul>
        {
          this.state.loading
          ? <div>Loading...</div>
          : (
            <ul className='select-options'>
              {this.state.options.map((option, index) => (
                <li className={'select-option' + (this.isSelected.bind(this)(option.path) ? ' selected' : '')}
                  onClick={e => this.toggleValue(option.path)}
                  key={index}
                >
                  {option.value}
                </li>
              ))}
            </ul>
          )
      }
        <div className='error-message'>{this.state.error}</div>
      </div>
    )
  }
}

export {Search}
