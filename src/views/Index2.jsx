import React, { useState, useEffect, useReducer } from "react";
import userReducer from "../reducers/user";

function reducer(state, action) {
  return state;
}

function wrapAsync(dispatch) {
  return function (action) {
    if (action instanceof Function) return action(dispatch);

    return dispatch(action);
  };
}

export default function Index() {
  // const [userData, userDispatch] = useReducer(userReducer, []);
  const [sdata, sdataDispatch] = useReducer(reducer, []);
  const asyncsDataDispatch = wrapAsync(sdataDispatch);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log("mounting");
    fetch("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=10")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  // console.log("userData", userData);
  // return userData.map((item) => <li key={item.id}>{item.title}</li>);
  return <div>ss</div>;
}
