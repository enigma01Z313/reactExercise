import React from 'react'

export default function TableHead(props) {
  const {columns, options, handleSort } = props;
  
  const printHeader = (column) => {
    const {options, handleSort} = props;
    const classList = [];
    if(options?.sortable?.sortBase === column.dataIndex) 
      classList.push('sortBase')

    if(options?.sortable?.order === 1) 
      classList.push('sortAscending')
    else  
      classList.push('sortDescending')

    return (
      <th 
        onClick={() => options?.sortable && handleSort(column)} 
        key={column.key}
        className={classList.join(' ')}>
        {column.title}
      </th>
    )
  }


  return (
    <thead>
      <tr className={options?.sortable && 'sortable'}>
        {
          options?.showRowCount && 
          <th>Row</th>
        }
        {columns.map(column => 
          printHeader(column)
        )}
      </tr>
    </thead>
  )
}
