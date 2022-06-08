import React, { Component } from 'react'

export default class TableSearch extends Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleSearch = () => {
    this.props.doSearch(this.state.value)
  }
    
  render() {
    return (
      <div>
        <input 
          id='searchBox' 
          type="text" 
          value={this.state.value}
          onChange={this.handleChange}/>
        <button onClick={() => this.handleSearch()}>Search</button>
      </div>
    )
  }
}
