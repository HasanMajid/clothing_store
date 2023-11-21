async function fetchName() {
  let name = "hi";
  await fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      name = data.FIRSTNAME;
      return name;
    })
    .catch((err) => {
      console.log("got error");
      console.log(err);
    });
  console.log(name);
  return name;
}

async function helperFetch(
  url,
  func = (data) => {
    console.log("altering/deleting");
  }
) {
  await fetch(url)
    .then((res) => res?.json())
    .then((data) => {
      func(data);
    })
    .catch((err) => {
      console.log("got fetch error with " + url);
      console.log(err);
    });
}
