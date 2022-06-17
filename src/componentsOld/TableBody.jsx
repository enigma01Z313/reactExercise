import React from "react";

export default function TableBody(props) {
  const { dataList, columns, options, loading } = props;

  const renderColumnData = (column, row) => {
    if (column.render) return column.render(row);

    return row[column.dataIndex];
  };

  return (
    <tbody>
      {!loading &&
        dataList.map((data, index) => (
          <tr key={data.id}>
            {options?.showRowCount && <th>{index + 1}</th>}
            {columns.map((column) => (
              <td key={column.key}>{renderColumnData(column, data)}</td>
            ))}
          </tr>
        ))}
      {loading && (
        <tr>
          <td className="loadingData" colSpan="100">
            &nbsp;
          </td>
        </tr>
      )}
    </tbody>
  );
}
