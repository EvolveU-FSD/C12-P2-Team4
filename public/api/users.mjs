export function getAllUsers() {
  const users = db.find();
  return users;
}

export function getUser(name) {
  const userRecord = users.find((record) => {
    return record.name == name;
  });
  return userRecord;
}

export function deleteUser(name) {
  users = users.filter((user) => {
    return user.name != name;
  });
}

export function addUser(newUser) {
  db.users.insertOne(newUser);
  return console.log(`${newuser} added.`); // users.push(newUser);
}
