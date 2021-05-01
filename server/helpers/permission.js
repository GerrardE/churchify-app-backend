import isEmpty from "@middlewares/isEmpty";

const handlePermission = async (req, permissions, name) => {
  try {
    if (req.method === "GET") {
      const checkperm = permissions.find((perm) => perm.name === `can:get:${name}`);
      if (isEmpty(checkperm)) {
        throw new Error();
      }
    }
    if (req.method === "POST") {
      const checkperm = permissions.find((perm) => perm.name === `can:post:${name}`);
      if (isEmpty(checkperm)) {
        throw new Error();
      }
    }
    if (req.method === "PUT") {
      const checkperm = permissions.find((perm) => perm.name === `can:put:${name}`);
      if (isEmpty(checkperm)) {
        throw new Error();
      }
    }
    if (req.method === "DELETE") {
      const checkperm = permissions.find((perm) => perm.name === `can:delete:${name}`);
      if (isEmpty(checkperm)) {
        throw new Error();
      }
    }
  } catch (err) {
    throw new Error();
  }
};

export default handlePermission;
