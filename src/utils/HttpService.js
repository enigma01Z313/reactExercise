const baseUrl = "https://jsonplaceholder.typicode.com/";

const HTTPRequest = async (url) => {
  await fetch(`${baseUrl}${url}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  console.log("doing HTTP request");
};

const HTTPRequest2 = (url) =>
  new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("doing HTTP request2");
        resolve(data);
      })
      .catch((err) => {
        // an error occured
        reject(err);
      });
  });

const GET = async (url) => {
  const data = await HTTPRequest2(url);
  console.log("tryieng to GET");
  return data;
};
const POST = () => {
  HTTPRequest();
  console.log("tryieng to POST");
};
const PUT = () => {
  HTTPRequest();
  console.log("tryieng to PUT");
};
const DELETE = () => {
  HTTPRequest();
  console.log("tryieng to DELETE");
};

module.exports = { GET, POST, PUT, DELETE };
