import React, { Component } from "react";
import Table from "./componentsOld/Table";
import Table2 from "./componentsOld/Table2";

export default class List extends Component {
  state = {
    usersTable: {
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
    },
    todosTable: {
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (data) => {
            return (
              <label className="statusCheck">
                <input
                  checked={data.completed && "checked"}
                  type="checkbox"
                  onChange={() => {
                    console.log("trying to change task status");
                  }}
                />
                <div></div>
              </label>
            );
          },
          value: (data) => {
            return +data.completed;
          },
        },
      ],
      data: [],
      options: {
        showRowCount: true,
        sortable: true,
      },
    },
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            usersTable: {
              ...this.state.usersTable,
              data,
            },
          });
        }, 3);
      });

    fetch("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=10")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          todosTable: {
            data,
          },
        });
      });
  }

  render() {
    return (
      <>
        {/* <Table
          columns={this.state.usersTable.columns}
          data={this.state.usersTable.data}
          options={this.state.usersTable.options}
        /> */}
        <Table2
          columns={this.state.usersTable.columns}
          data={this.state.usersTable.data}
          options={this.state.usersTable.options}
        />

        {/* <Table
          columns={this.state.todosTable.columns}
          data={this.state.todosTable.data}
          options={this.state.todosTable.options}
        /> */}
      </>
    );
  }
}
