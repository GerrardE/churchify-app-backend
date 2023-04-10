const Sequelize = require("sequelize");

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Configs", [
    {
      name: "categories",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "zones",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "name", datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "country", datatype: "string", required: true, validation: { required: "country is required" }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "events",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "downloads",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, { field: "categoryid", datatype: "integer", required: true }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "url", datatype: "string", required: true, validation: { required: "url is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "fellowships",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "country", datatype: "string", required: true, validation: { required: "country is required" }
      }, {
        field: "state", datatype: "string", required: true, validation: { required: "state is required" }
      }, {
        field: "city", datatype: "string", required: true, validation: { required: "city is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "address", datatype: "string", required: true, validation: { required: "address is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "cell",
      type: "report",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "fellowshipid", datatype: "integer", required: true, validation: { required: "fellowship is required" }
      }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "newcells", datatype: "integer", required: true, validation: { required: "no. newcells is required" }
      }, {
        field: "totalcells", datatype: "integer", required: true, validation: { required: "totalcells is required" }
      }, {
        field: "attendance", datatype: "integer", required: true, validation: { required: "attendance is required" }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "membership",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "adults", datatype: "integer", required: true, validation: { required: "no. adults is required" }
      }, {
        field: "children", datatype: "integer", required: true, validation: { required: "no. children is required" }
      }, {
        field: "tithers", datatype: "integer", required: true, validation: { required: "no. tithers is required" }
      }, {
        field: "newmembers", datatype: "integer", required: true, validation: { required: "no of newmembers is required" }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "attendance",
      type: "report",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "eventid", datatype: "integer", required: true, validation: { required: "event is required" }
      }, {
        field: "preacherid", datatype: "integer", required: true, validation: { required: "preacher is required" }
      }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "men", datatype: "integer", required: true, validation: { required: "no of men is required" }
      }, {
        field: "women", datatype: "integer", required: true, validation: { required: "no of women is required" }
      }, {
        field: "children", datatype: "integer", required: true, validation: { required: "no of children is required" }
      }, {
        field: "notes", datatype: "string", required: false,
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "group",
      type: "report",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "cmf", datatype: "integer", required: true, validation: { required: "cmf is required" }
      }, {
        field: "cwf", datatype: "integer", required: true, validation: { required: "cwf is required" }
      }, {
        field: "ywcf", datatype: "integer", required: true, validation: { required: "ywcf is required" }
      }, {
        field: "gymcf", datatype: "integer", required: true, validation: { required: "gymcf is required" }
      }, {
        field: "yaf", datatype: "integer", required: true, validation: { required: "cwf is required" }
      }, {
        field: "teens", datatype: "integer", required: true, validation: { required: "teens is required" }
      }, {
        field: "rcf", datatype: "integer", required: true, validation: { required: "rcf is required" }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "training",
      type: "report",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "trainingtypeid", datatype: "integer", required: true, validation: { required: "training type is required" }
      }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "converts", datatype: "integer", required: true, validation: { required: "no. converts is required" }
      }, {
        field: "trainees", datatype: "integer", required: true, validation: { required: "no. trainees is required" }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "permissions",
      type: "setting",
      config: [{
        field: "name", datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "activity",
      type: "report",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "activitytypeid", datatype: "integer", required: true, validation: { required: "activitytype is required" }
      }, {
        field: "date", datatype: "string", required: true, validation: { required: "date is required" }
      }, {
        field: "council", datatype: "integer", required: true, validation: { required: "council is required" }
      }, {
        field: "special", datatype: "integer", required: true, validation: { required: "special is required" }
      }, {
        field: "project", datatype: "integer", required: true, validation: { required: "project is required" }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "preachers",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "country", datatype: "string", required: true, validation: { required: "country is required" }
      }, {
        field: "state", datatype: "string", required: true, validation: { required: "state is required" }
      }, {
        field: "city", datatype: "string", required: true, validation: { required: "city is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "firstname", datatype: "string", required: true, validation: { required: "firstname is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "lastname", datatype: "string", required: true, validation: { required: "lastname is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "phone", datatype: "string", required: true, validation: { required: "phone is required", maxLength: { value: 20, message: "max. of 20 digits required" }, minLength: { value: 3, message: "min. of 3 digits required" } }
      }, {
        field: "email", datatype: "string", required: true, validation: { required: "email is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "address", datatype: "string", required: true, validation: { required: "address is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "branches",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "country", datatype: "string", required: true, validation: { required: "country is required" }
      }, {
        field: "state", unique: true, datatype: "string", required: true, validation: { required: "state is required" }
      }, {
        field: "city", datatype: "string", required: true, validation: { required: "city is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "address", datatype: "string", required: true, validation: { required: "address is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "roles",
      type: "setting",
      config: [{
        field: "name", datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "users",
      type: "setting",
      config: [{
        field: "country", datatype: "string", required: true, validation: { required: "country is required" }
      }, {
        field: "state", datatype: "string", required: true, validation: { required: "state is required" }
      }, { field: "city", datatype: "string" }, {
        field: "zoneid", datatype: "integer", required: true, validation: { required: "zone is required" }
      }, {
        field: "branchid", datatype: "integer", required: true, validation: { required: "branch is required" }
      }, {
        field: "firstname", datatype: "string", required: true, validation: { required: "firstname is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "lastname", datatype: "string", required: true, validation: { required: "lastname is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "phone", datatype: "string", required: true, validation: { required: "phone is required", maxLength: { value: 20, message: "max. of 20 digits required" }, minLength: { value: 3, message: "min. of 3 digits required" } }
      }, {
        field: "email", datatype: "string", required: true, validation: { required: "email is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "password", datatype: "string", required: true, validation: { required: "password is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "users:admin:update",
      type: "setting",
      config: [{
        field: "firstname", datatype: "string", required: true, validation: { required: "firstname is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "lastname", datatype: "string", required: true, validation: { required: "lastname is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "phone", datatype: "string", required: true, validation: { required: "phone is required", maxLength: { value: 20, message: "max. of 20 digits required" }, minLength: { value: 3, message: "min. of 3 digits required" } }
      }, {
        field: "email", datatype: "string", required: true, validation: { required: "email is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "password", datatype: "string", required: true, validation: { required: "password is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "configs",
      type: "setting",
      config: [{
        field: "name", datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "type", datatype: "string", required: true, validation: { required: "type is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }, {
        field: "config", datatype: "string", required: true, validation: { required: "config is required", minLength: { value: 2, message: "min. of 2 characters required" } }
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "activitytypes",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "trainingtypes",
      type: "setting",
      config: [{ field: "userid", datatype: "uuid", required: true }, {
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 5, message: "min. of 5 characters required" } }
      }, {
        field: "notes", datatype: "string", required: false
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}, { config: { type: Sequelize.ARRAY(Sequelize.JSONB) } }),

  down: (queryInterface) => queryInterface.bulkDelete("Configs", null, {})
};
