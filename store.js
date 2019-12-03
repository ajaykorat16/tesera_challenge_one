const fs = require('fs');
const storage = 'store/data.json';
const [action, key, value] = process.argv.slice(2);

if (action == 'add') {
  if (undefined != key && undefined != value) {
    add(key, value);
  } else {
    console.error('Please provide proper key and value');
  }
} else if (action == 'list') {
  list();
} else if (action == 'get') {
  if (undefined != key) {
    get(key);
  } else {
    console.error('Please provide valid key to get value');
  }
} else if (action == 'remove') {
  if (undefined != key) {
    remove(key);
  } else {
    console.error('Please provide valid key to remove value');
  }
} else {
  console.error('This method is not available');
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
    fs.writeFileSync(storage, json, 'utf8');
    console.log('Added Successfully');
  } catch (e) {
    console.error('Error', e);
  }
}

function list() {
  const data = fs.readFileSync(storage);
  try {
    var obj = JSON.parse(data);
    if (obj.length > 0) {
      obj.forEach(data => {
        console.log(printformat(data));
      });
    } else {
      console.error(
        'No records found, please add first with "node store add key value"'
      );
    }
  } catch (e) {
    console.error('No records found', e);
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
    console.log('No records found');
  }
}

function remove(key) {
  const data = fs.readFileSync(storage);
  try {
    var obj = JSON.parse(data);
  } catch (e) {
    console.log('No records found');
  }

  const value = obj.filter(value => {
    return Object.keys(value).shift() != key;
  });

  try {
    json = JSON.stringify(value);
    fs.writeFileSync(storage, json, 'utf8');
    console.log('Removed');
  } catch (e) {
    console.log('No records found');
  }
}

function printformat(obj) {
  return `${Object.keys(obj).shift()} ==> ${obj[Object.keys(obj).shift()]}`;
}
