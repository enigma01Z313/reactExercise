import HttpService from "../utils/HttpService";

export default async function userReducer(state, action) {
  console.log("user reducer", state, action);

  const data = await HttpService.GET('users')
  const d = [...data]
  console.log('data', data);
  console.log('d', d);

  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // const data = await res.json();
  // .then(res => res.json())
  // .then(data => )
  // console.log('data', data);

  return d;
}
