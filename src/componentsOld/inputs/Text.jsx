import React from "react";

export default function Input(props) {
  const handleChange = (e) => props.changeValue(e.target.value);

  return <input type="text" value={props.value} onChange={handleChange} />;
}
