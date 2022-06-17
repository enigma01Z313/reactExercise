import React, { useState } from "react";
import Input from "./inputs/Input";

export default function TableSearch (props) {
  const [value, setValue] = useState("");

  const changeValue = (val) => setValue(val);

  const handleSearch = () => props.doSearch(value);

  return (
    <div className="table-search">
      <Input value={value} changeValue={changeValue} />
      <button onClick={handleSearch}>Go</button>
    </div>
  );
};
