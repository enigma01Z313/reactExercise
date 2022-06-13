import React, { Component } from "react";

export default class TableBody extends Component {
  renderColumnData = (column, row) => {
    if (column.render) return column.render(row);

    return row[column.dataIndex];
  };

  render() {
    const { dataList, columns, options, loading } = this.props;

    return (
      <tbody>
        {!loading && dataList.map((data, index) => (
          <tr key={data.id}>
            {options?.showRowCount && <th>{index + 1}</th>}
            {columns.map((column) => (
              <td key={column.key}>{this.renderColumnData(column, data)}</td>
            ))}
          </tr>
        ))}
        {loading && 
          <tr>
            <td className="loadingData" colSpan="100">&nbsp;</td>
          </tr>
        }
      </tbody>
    );
  }
}
