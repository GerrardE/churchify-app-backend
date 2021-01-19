/**
 * @param {user} user object from the database
 * @param {token} token gotten from payload
 */

const userExtractor = (user, token) => {
  const {
    email, id, firstname, lastname
  } = user;
  let role = 'guest';

  if (user.roles && user.roles.length > 0) {
    role = user.roles[0].name;
  }

  return {
    id,
    firstname,
    lastname,
    email,
    token,
    role,
  };
};

export default userExtractor;
