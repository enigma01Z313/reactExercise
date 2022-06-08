import React, { Component } from 'react'

export default class TableHead extends Component {
  printHeader = (column) => {
    const {options, handleSort} = this.props;
    const classList = [];
    if(options?.sortable?.sortBase === column.dataIndex) 
      classList.push('sortBase')

    if(options?.sortable?.order === 1) 
      classList.push('sortAscending')
    else  
      classList.push('sortDescending')

    return (
      <th 
        onClick={() => options?.sortable && handleSort(column.key)} 
        key={column.key}
        className={classList.join(' ')}>
        {column.title}
      </th>
    )
  }

  render() {
    const {columns, options} = this.props

    return (
      <thead>
        <tr className={options?.sortable && 'sortable'}>
          {
            options?.showRowCount && 
            <th>Row</th>
          }
          {columns.map(column => 
            this.printHeader(column)
          )}
        </tr>
      </thead>
    )
  }
}
