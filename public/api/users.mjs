var users = [
  { name: "Tony", team: "oilers" },
  { name: "Chris", team: "flames" },
];

export function getAllUsers() {
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
  users.push(newUser);
}
