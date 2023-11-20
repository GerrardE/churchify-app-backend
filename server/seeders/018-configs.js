const Sequelize = require("sequelize");

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Configs", [
    {
      name: "cities",
      type: "setting",
      config: [
        {
          field: "name",
          unique: true,
          datatype: "string",
          required: true,
          validation: {
            required: "name is required",
            minLength: {
              value: 2,
              message: "min. of 2 characters is required"
            }
          }
        },
        {
          field: "country",
          datatype: "integer",
          required: true,
          validation: {
            required: "country is required"
          }
        },
        {
          field: "country_code",
          datatype: "string",
          required: true,
          validation: {
            required: "country code is required"
          }
        },
        {
          field: "state_id",
          datatype: "integer",
          required: true,
          validation: {
            required: "state is required"
          }
        },
        {
          field: "state_code",
          datatype: "string",
          required: true,
          validation: {
            required: "state code is required"
          }
        },
        {
          field: "latitude",
          datatype: "string",
          required: true,
          validation: {
            required: "latitude is required"
          }
        },
        {
          field: "longitude",
          datatype: "string",
          required: true,
          validation: {
            required: "longitude is required"
          }
        },
        {
          field: "flag",
          datatype: "string",
          required: true,
          validation: {
            required: "flag is required"
          }
        },
        {
          field: "wikiDataId",
          datatype: "string",
          required: true,
          validation: {
            required: "wikiDataId is required"
          }
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "states",
      type: "setting",
      config: [{
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 2, message: "min. of 2 characters is required" } }
      }, {
        field: "country_id", datatype: "integer", required: true, validation: { required: "country is required" }
      }, {
        field: "country_code", datatype: "string", required: true, validation: { required: "country code is required" }
      }, {
        field: "fips_code", datatype: "string", required: true, validation: { required: "fips code is required" }
      }, {
        field: "iso2", datatype: "string", required: true, validation: { required: "iso2 is required" }
      }, {
        field: "flag", datatype: "integer", required: true, validation: { required: "flag is required" }
      }, {
        field: "wikiDataId", datatype: "string", required: true, validation: { required: "wikiDataId is required" }
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "countries",
      type: "setting",
      config: [{
        field: "name", unique: true, datatype: "string", required: true, validation: { required: "name is required", minLength: { value: 2, message: "min. of 2 characters is required" } }
      }, {
        field: "phonecode", datatype: "string", required: true, validation: { required: "phonecode is required" }
      }, {
        field: "capital", datatype: "string", required: true, validation: { required: "capital is required" }
      }, {
        field: "currency", datatype: "string", required: true, validation: { required: "currency is required" }
      }, {
        field: "native", datatype: "string", required: true, validation: { required: "native is required" }
      }, {
        field: "region", datatype: "string", required: true, validation: { required: "region is required" }
      }, {
        field: "subregion", datatype: "string", required: true, validation: { required: "subregion is required" }
      }, {
        field: "emoji", datatype: "string", required: true, validation: { required: "emoji is required" }
      }, {
        field: "emojiU", datatype: "string", required: true, validation: { required: "emojiU is required" }
      }, {
        field: "iso3", datatype: "string", required: true, validation: { required: "iso3 is required" }
      }, {
        field: "iso2", datatype: "string", required: true, validation: { required: "iso2 is required" }
      }, {
        field: "flag", datatype: "integer", required: true, validation: { required: "flag is required" }
      }, {
        field: "wikiDataId", datatype: "string", required: true, validation: { required: "wikiDataId is required" }
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}, { config: { type: Sequelize.ARRAY(Sequelize.JSONB) } }),

  down: (queryInterface) => queryInterface.bulkDelete("Configs", null, {})
};
