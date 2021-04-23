/**
 * @param {user} user object from the database
 * @param {token} token gotten from payload
 */

const userExtractor = (user, token) => {
  const {
    email, id, firstname, lastname, branch, zone,
  } = user;

  let role = "guest";
  let permissions = [];

  if (user.roles && user.roles.length > 0) {
    role = user.roles[0].name;
    permissions = user.roles[0].permissions;
  }

  return {
    id,
    firstname,
    lastname,
    email,
    branch,
    zone,
    token,
    role,
    permissions,
  };
};

export default userExtractor;
