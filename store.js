const fs = require("fs");
const storage = "store/data.json";
const [action, key, value] = process.argv.slice(2);

if (action == "add") {
  add(key, value);
} else if (action == "list") {
  list();
} else if (action == "get") {
  get(key);
} else if (action == "remove") {
  remove(key);
}

function add(key, value) {
  const data = fs.readFileSync(storage);
  try {
    var obj = JSON.parse(data);
  } catch (e) {
    obj = [];
  }
  obj.push({ [key]: value });
  json = JSON.stringify(obj);
  try {
    fs.writeFileSync(storage, json, "utf8");
    console.log("Added Successfully");
  } catch (e) {
    console.error("Error", e);
  }
}

function list() {
  const data = fs.readFileSync(storage);
  try {
    var obj = JSON.parse(data);
    obj.forEach(data => {
      console.log(printformat(data));
    });
  } catch (e) {
    console.error("No records found", e);
  }
}

function get(key) {
  const data = fs.readFileSync(storage);
  try {
    var obj = JSON.parse(data);
    const value = obj.filter(value => {
      return Object.keys(value).shift() == key;
    });
    console.log(printformat(value.shift()));
  } catch (e) {
    console.log("No records found");
  }
}

function remove(key) {
  const data = fs.readFileSync(storage);
  try {
    var obj = JSON.parse(data);
  } catch (e) {
    console.log("No records found");
  }
  const value = obj.filter(value => {
    return Object.keys(value).shift() != key;
  });

  try {
    json = JSON.stringify(value);
    fs.writeFileSync(storage, json, "utf8");
    console.log("Removed");
  } catch (e) {
    console.log("No records found");
  }
}

function printformat(obj) {
  return `${Object.keys(obj).shift()} ==> ${obj[Object.keys(obj).shift()]}`;
}
