import React, { Component } from 'react'
import Table from './components/Table'


export default class List extends Component {
  state = {
    columns: [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }
    ],
    data: [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
      {
        key: '3',
        name: 'Mike',
        age: 30,
        address: '10 Downing Street',
      },
    ],
    options: {
      showRowCount: true,
      sortable: true,
      searchable: ['name', 'address']
    }
  }


  render() {
    return (
      <Table 
        columns={this.state.columns} 
        data={this.state.data} 
        options={this.state.options} />
    )
  }
}
