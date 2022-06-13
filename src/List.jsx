import React, { Component } from "react";
import Table from "./components/Table";

export default class List extends Component {
  state = {
    columns: [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (data) => {
          return `${data.address.street} - ${data.address.city}, ${data.address.zipcode}`;
        },
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website",
      },
    ],
    data: [],
    options: {
      showRowCount: true,
      sortable: true,
      searchable: ["name", "address"],
    },
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data,
        });
      });
  }

  render() {
    return (
      <Table
        columns={this.state.columns}
        data={this.state.data}
        options={this.state.options}
      />
    );
  }
}
