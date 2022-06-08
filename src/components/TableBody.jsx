import React, { Component } from 'react'

export default class TableBody extends Component{
  render() {
    const {dataList, columns, options} = this.props

    return (
      <tbody>
        {
          dataList.map((data, index) => 
            <tr key={data.key}>
              {
                options?.showRowCount && 
                <th>{index + 1}</th>
              }
              {columns.map(column => 
                <td key={column.key}>
                  {data[column.dataIndex]}
                </td> 
              )}
            </tr>
          )
        }
      </tbody>
    )
  }
}