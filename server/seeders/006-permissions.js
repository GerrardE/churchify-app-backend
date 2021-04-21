module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Permissions", [
    {
      name: "can:post:zone",
      notes: "can post zone",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:zone",
      notes: "can get zone",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:zone",
      notes: "can put zone",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:zone",
      notes: "can delete zone",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:branch",
      notes: "can post branch",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:branch",
      notes: "can get branch",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:branch",
      notes: "can put branch",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:branch",
      notes: "can delete branch",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:fellowship",
      notes: "can post fellowship",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:fellowship",
      notes: "can get fellowship",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:fellowship",
      notes: "can put fellowship",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:fellowship",
      notes: "can delete fellowship",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:event",
      notes: "can post event",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:event",
      notes: "can get event",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:event",
      notes: "can put event",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:event",
      notes: "can delete event",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:category",
      notes: "can post category",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:category",
      notes: "can get category",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:category",
      notes: "can put category",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:category",
      notes: "can delete category",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:preacher",
      notes: "can post preacher",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:preacher",
      notes: "can get preacher",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:preacher",
      notes: "can put preacher",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:preacher",
      notes: "can delete preacher",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:config",
      notes: "can post config",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:config",
      notes: "can get config",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:config",
      notes: "can put config",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:config",
      notes: "can delete config",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:user",
      notes: "can post user",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:user",
      notes: "can get user",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:user",
      notes: "can put user",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:user",
      notes: "can delete user",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:permission",
      notes: "can post permission",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:permission",
      notes: "can get permission",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:permission",
      notes: "can put permission",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:permission",
      notes: "can delete permission",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:role",
      notes: "can post role",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:role",
      notes: "can get role",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:role",
      notes: "can put role",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:role",
      notes: "can delete role",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:post:apilog",
      notes: "can post apilog",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:get:apilog",
      notes: "can get apilog",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:put:apilog",
      notes: "can put apilog",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "can:delete:apilog",
      notes: "can delete apilog",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete("Permissions", null, {})
};
