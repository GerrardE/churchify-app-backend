/**
 * @param {user} user object from the database
 * @param {token} token gotten from payload
 */

const userExtractor = (user, token) => {
  const {
    email, id, firstname, lastname
  } = user;
  return {
    id, firstname, lastname, email, token,
  };
};

export default userExtractor;
