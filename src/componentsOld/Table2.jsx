import React, { useState, useEffect, useRef } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableSearch from "./TableSearch";

export default function Table2(props) {
  const { options, columns, data: propData } = props;
  const isInitialMount = useRef(true);

  const [loading, setLoading] = useState(true);
  const [dataBackup, setDataBackup] = useState(undefined);
  const [data, setData] = useState(propData);
  const [soptions, ssetOptions] = useState(options);

  const renderedColumnData = (column, data) => {
    if (column.value) return column.value(data);

    if (column.render) return column.render(data);

    return data[column.key];
  };

  const justSearch = (data, key, targetColumns) =>
    data.filter((item) => {
      const b = targetColumns.reduce(
        (acc, cur) =>
          renderedColumnData(cur, item)
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

  const getSortOrder = (sortBase) => {
    if (options?.sortable !== true && options.sortable.sortBase === sortBase)
      return -options.sortable.order; // same sortbase & reverse order

    return 1; //there is no sortbase
  };

  const doSearch = (searchVal) => {
    let newData;
    const targetColumns = props?.columns.filter((item) =>
      props?.options?.searchable.includes(item.dataIndex)
    );

    if (!dataBackup) {
      setDataBackup([...props.data]);
      newData = justSearch(props.data, searchVal, targetColumns);
    } else newData = justSearch(dataBackup, searchVal, targetColumns);

    setData(newData);
  };

  const sort = (column) => {
    console.log("sort");

    const sortBase = column.key;
    let newSortMeta, order;

    order = getSortOrder(sortBase);
    newSortMeta = { sortBase, order };

    const newData = [propData].sort((a, b) =>
      renderedColumnData(column, a) < renderedColumnData(column, b)
        ? -1 * order
        : 1 * order
    );

    // console.log({
    //   ...options,
    //   sortable: newSortMeta,
    // });
    console.log(newData);

    setData(newData)
    // ssetOptions({
    //   ...options,
    //   sortable: newSortMeta,
    // })
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setData(propData);
      setLoading(false);
    }
  }, [propData]);

  return (
    <div className="tableWrapper">
      {options?.searchable && (
        <>
          <TableSearch doSearch={options?.searchable && doSearch} />
        </>
      )}
      <table className="fTable">
        <TableHead columns={columns} options={options} handleSort={sort} />
        <TableBody
          loading={loading}
          dataList={data}
          columns={columns}
          options={options}
        />
      </table>
    </div>
  );
}
