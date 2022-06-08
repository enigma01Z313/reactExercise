import React, { Component } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableSearch from './TableSearch'

export default class Table extends Component {
  state = {
    data: this.props.data,
    columns: this.props.columns,
    options: this.props.options,
    dataBackup: undefined
  }

  justSearch = (data, key) => 
    data.filter( 
      item => {
        const b = this?.state?.options?.searchable.reduce((acc, cur) => 
          item[cur]
            .toLowerCase()
            .includes(key.toLowerCase()) ? 
              acc + 1 : acc
        , 0)
        
        if ( b !== 0 ) return item
      }
    )

  getSortOrder = (sortBase) => {
    if( 
      this.state?.options?.sortable !== true && 
      this.state.options.sortable.sortBase === sortBase 
    ) return -this.state.options.sortable.order // same sortbase & reverse order

    return 1 //there is no sortbase 
  }

  sort = (sortBase) => {
    let newSortMeta, order;

    order = this.getSortOrder(sortBase)
    newSortMeta = {sortBase, order}
    
    const newData = [...this.state.data]
      .sort(
        (a, b) => a[sortBase] < b[sortBase] ? 
          -1*order : 
          1*order
      );

    this.setState({
      ...this.state, 
      data: newData,
      options: {
        ...this.state.options,
        sortable: newSortMeta
      }
    })
  }

  doSearch = (searchVal) => {
    let newData

    if( !this.state.dataBackup ) {
      this.setState({dataBackup: [...this.state.data]})
      newData = this.justSearch(this.state.data, searchVal)
    }else 
      newData = this.justSearch(this.state.dataBackup, searchVal)
    
    this.setState({data: newData})
  }

  render() {
    return (
      <>
        {
          this.state?.options?.searchable && 
          <TableSearch 
            doSearch={this.state?.options?.searchable && this.doSearch}/>
        }
        <table className='fTable' border="1">
          <TableHead 
            columns={this.state.columns} 
            options={this.state.options} 
            handleSort={this.sort}/>
          <TableBody 
            dataList={this.state.data} 
            columns={this.state.columns} 
            options={this.state.options} />
        </table>
      </>
    )
  }
}
