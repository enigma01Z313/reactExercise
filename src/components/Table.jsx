import React, { Component } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableSearch from "./TableSearch";

export default class Table extends Component {
  state = {
    data: this.props.data,
    columns: this.props.columns,
    options: this.props.options,
    dataBackup: undefined,
  };

  renderedColumnData = (column, data) => {
    if (column.render) return column.render(data);

    return data[column.key];
  };

  justSearch = (data, key, targetColumns) =>
    data.filter((item) => {
      const b = targetColumns.reduce(
        (acc, cur) =>
          this.renderedColumnData(cur, item)
            .toString()
            .toLowerCase()
            .includes(key.toLowerCase())
            ? acc + 1
            : acc,
        0
      );

      if (b !== 0) return item;

      return false;
    });

  getSortOrder = (sortBase) => {
    if (
      this.state?.options?.sortable !== true &&
      this.state.options.sortable.sortBase === sortBase
    )
      return -this.state.options.sortable.order; // same sortbase & reverse order

    return 1; //there is no sortbase
  };

  sort = (column) => {
    const sortBase = column.key;
    let newSortMeta, order;

    order = this.getSortOrder(sortBase);
    newSortMeta = { sortBase, order };

    console.log(newSortMeta);

    const newData = [...this.state.data].sort((a, b) =>
      this.renderedColumnData(column, a) < this.renderedColumnData(column, b)
        ? -1 * order
        : 1 * order
    );

    this.setState({
      ...this.state,
      data: newData,
      options: {
        ...this.state.options,
        sortable: newSortMeta,
      },
    });
  };

  doSearch = (searchVal) => {
    let newData;
    const targetColumns = this?.state?.columns.filter((item) =>
      this?.state?.options?.searchable.includes(item.dataIndex)
    );

    if (!this.state.dataBackup) {
      this.setState({ dataBackup: [...this.state.data] });
      newData = this.justSearch(this.state.data, searchVal, targetColumns);
    } else
      newData = this.justSearch(
        this.state.dataBackup,
        searchVal,
        targetColumns
      );

    this.setState({ data: newData });
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({
        data: this.props.data,
      });
    }
  }

  render() {
    return (
      <div className="tableWrapper">
        {this.state?.options?.searchable && (
          <TableSearch
            doSearch={this.state?.options?.searchable && this.doSearch}
          />
        )}
        <table className="fTable">
          <TableHead
            columns={this.state.columns}
            options={this.state.options}
            handleSort={this.sort}
          />
          <TableBody
            dataList={this.state.data}
            columns={this.state.columns}
            options={this.state.options}
          />
        </table>
      </div>
    );
  }
}
