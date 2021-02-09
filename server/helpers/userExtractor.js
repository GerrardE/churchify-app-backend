/**
 * @param {user} user object from the database
 * @param {token} token gotten from payload
 */

const userExtractor = (user, token) => {
  const {
    email, id, firstname, lastname
  } = user;

  let role = 'guest';
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
    token,
    role,
    permissions,
  };
};

export default userExtractor;
