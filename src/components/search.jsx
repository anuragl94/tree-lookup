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
    this.selectValue = this.selectValue.bind(this)
  }
  search (term) {
    let _this = this
    this.setState({loading: true})
    this.api.getChildrenAsPromise(term).then(function (options) {
      _this.setState({options, loading: false})
    }).catch
  }
  selectValue (value) {
    if (this.state.values.indexOf(value) > -1) {
      return
    }
    this.setState(function (prevState) {
      let newState = Object.assign({}, prevState)
      newState.values.push(value)
      return newState
    })
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
        <ul className='selected-tags'>
          {this.state.values.map((value, index) => (
            <li className='selected-tag' key={index}>
              {value}
            </li>
          ))}
        </ul>
        <input className='cool-input' onChange={(e) => { this.search(e.target.value) }} />
        {
          this.state.loading
          ? <div>Loading...</div>
          : (
            <ul className='select-options'>
              {this.state.options.map((value, index) => (
                <li className={'select-option' + (this.isSelected.bind(this)(value) ? ' selected' : '')}
                  onClick={e => this.selectValue(value)}
                  key={index}
                >
                  {value}
                </li>
              ))}
            </ul>
          )
      }
      </div>
    )
  }
}

export {Search}
