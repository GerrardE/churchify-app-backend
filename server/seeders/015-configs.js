const Sequelize = require("sequelize");

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Configs", [
    {
      name: "remunerations",
      type: "report",
      config: [
        {
          field: "userid",
          datatype: "uuid",
          required: true
        },
        {
          field: "financeid",
          datatype: "integer",
          required: true,
          validation: {
            required: "finance required(select the finance to report)"
          }
        },
        {
          field: "pastorpayed",
          datatype: "string",
          required: true,
          validation: {
            required: "pastorpayed is required"
          }
        },
        {
          field: "fulltimepastorcount",
          datatype: "integer",
          required: true,
          validation: {
            required: "fulltimepastorcount is required"
          }
        },
        {
          field: "uploads",
          datatype: "string",
          required: true,
          validation: {
            required: "uploads are required"
          }
        },
        {
          field: "notes",
          datatype: "string",
          required: false
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "payments",
      type: "report",
      config: [
        {
          field: "userid",
          datatype: "uuid",
          required: true
        },
        {
          field: "financeid",
          datatype: "integer",
          required: true,
          validation: {
            required: "finance required(select the finance to report)"
          }
        },
        {
          field: "nationalofficeremittance",
          datatype: "string",
          required: true,
          validation: {
            required: "nationalofficeremittance is required"
          }
        },
        {
          field: "hqbuilding",
          datatype: "integer",
          required: true,
          validation: {
            required: "hqbuilding is required"
          }
        },
        {
          field: "zonalhqremittance",
          datatype: "integer",
          required: true,
          validation: {
            required: "zonalhqremittance is required"
          }
        },
        {
          field: "salariesallowances",
          datatype: "integer",
          required: true,
          validation: {
            required: "salariesallowances is required"
          }
        },
        {
          field: "pastorpension",
          datatype: "integer",
          required: true,
          validation: {
            required: "pastorpension is required"
          }
        },
        {
          field: "crusadeandmissionary",
          datatype: "integer",
          required: true,
          validation: {
            required: "crusadeandmissionary is required"
          }
        },
        {
          field: "personalwelfare",
          datatype: "integer",
          required: true,
          validation: {
            required: "personalwelfare is required"
          }
        },
        {
          field: "transport",
          datatype: "integer",
          required: true,
          validation: {
            required: "transport is required"
          }
        },
        {
          field: "accomodation",
          datatype: "integer",
          required: true,
          validation: {
            required: "accomodation is required"
          }
        },
        {
          field: "donations",
          datatype: "integer",
          required: true,
          validation: {
            required: "donations is required"
          }
        },
        {
          field: "entertainment",
          datatype: "integer",
          required: true,
          validation: {
            required: "entertainment is required"
          }
        },
        {
          field: "medicalwelfare",
          datatype: "integer",
          required: true,
          validation: {
            required: "medicalwelfare is required"
          }
        },
        {
          field: "stationery",
          datatype: "integer",
          required: true,
          validation: {
            required: "stationery is required"
          }
        },
        {
          field: "churchexpenses",
          datatype: "integer",
          required: true,
          validation: {
            required: "churchexpenses is required"
          }
        },
        {
          field: "officeexpenses",
          datatype: "integer",
          required: true,
          validation: {
            required: "officeexpenses is required"
          }
        },
        {
          field: "rentpersonage",
          datatype: "integer",
          required: true,
          validation: {
            required: "rentpersonage is required"
          }
        },
        {
          field: "churchrent",
          datatype: "integer",
          required: true,
          validation: {
            required: "churchrent is required"
          }
        },
        {
          field: "telephoneandinternet",
          datatype: "integer",
          required: true,
          validation: {
            required: "telephoneandinternet is required"
          }
        },
        {
          field: "electricity",
          datatype: "integer",
          required: true,
          validation: {
            required: "electricity is required"
          }
        },
        {
          field: "fuels",
          datatype: "integer",
          required: true,
          validation: {
            required: "fuels is required"
          }
        },
        {
          field: "subscriptions",
          datatype: "integer",
          required: true,
          validation: {
            required: "subscriptions is required"
          }
        },
        {
          field: "security",
          datatype: "integer",
          required: true,
          validation: {
            required: "security is required"
          }
        },
        {
          field: "bankcharges",
          datatype: "integer",
          required: true,
          validation: {
            required: "bankcharges is required"
          }
        },
        {
          field: "groupexpenses",
          datatype: "integer",
          required: true,
          validation: {
            required: "groupexpenses is required"
          }
        },
        {
          field: "loanadvanced",
          datatype: "integer",
          required: true,
          validation: {
            required: "loanadvanced is required"
          }
        },
        {
          field: "loanrepayed",
          datatype: "integer",
          required: true,
          validation: {
            required: "loanrepayed is required"
          }
        },
        {
          field: "furnituremaintenance",
          datatype: "integer",
          required: true,
          validation: {
            required: "furnituremaintenance is required"
          }
        },
        {
          field: "eqptmaintenance",
          datatype: "integer",
          required: true,
          validation: {
            required: "eqptmaintenance is required"
          }
        },
        {
          field: "motormaintenance",
          datatype: "integer",
          required: true,
          validation: {
            required: "motormaintenance is required"
          }
        },
        {
          field: "churchbldmaintenance",
          datatype: "integer",
          required: true,
          validation: {
            required: "churchbldmaintenance is required"
          }
        },
        {
          field: "parsonagemaintenance",
          datatype: "integer",
          required: true,
          validation: {
            required: "parsonagemaintenance is required"
          }
        },
        {
          field: "uploads",
          datatype: "string",
          required: true,
          validation: {
            required: "uploads are required"
          }
        },
        {
          field: "notes",
          datatype: "string",
          required: false
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "finances",
      type: "report",
      config: [
        {
          field: "userid",
          datatype: "uuid",
          required: true
        },
        {
          field: "name",
          datatype: "string",
          required: true,
          validation: {
            required: "name is required",
            minLength: {
              value: 3,
              message: "min. of 3 characters required"
            }
          }
        },
        {
          field: "zoneid",
          datatype: "integer",
          required: true,
          validation: {
            required: "zone is required"
          }
        },
        {
          field: "branchid",
          datatype: "integer",
          required: true,
          validation: {
            required: "branch is required"
          }
        },
        {
          field: "preacherid",
          datatype: "integer",
          required: true,
          validation: {
            required: "preacher is required"
          }
        },
        {
          field: "notes",
          datatype: "string",
          required: false
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "assets",
      type: "report",
      config: [
        {
          field: "userid",
          datatype: "uuid",
          required: true
        },
        {
          field: "financeid",
          datatype: "integer",
          required: true,
          validation: {
            required: "finance required(select the finance to report)"
          }
        },
        {
          field: "building",
          datatype: "integer",
          required: true,
          validation: {
            required: "building is required"
          }
        },
        {
          field: "motorvehicle",
          datatype: "integer",
          required: true,
          validation: {
            required: "motorvehicle is required"
          }
        },
        {
          field: "generator",
          datatype: "integer",
          required: true,
          validation: {
            required: "generator is required"
          }
        },
        {
          field: "musicaleqpt",
          datatype: "integer",
          required: true,
          validation: {
            required: "musicaleqpt is required"
          }
        },
        {
          field: "asabaproject",
          datatype: "integer",
          required: true,
          validation: {
            required: "asabaproject is required"
          }
        },
        {
          field: "others",
          datatype: "integer",
          required: true,
          validation: {
            required: "others is required"
          }
        },
        {
          field: "uploads",
          datatype: "string",
          required: true,
          validation: {
            required: "uploads are required"
          }
        },
        {
          field: "notes",
          datatype: "string",
          required: false
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "receipts",
      type: "report",
      config: [
        {
          field: "userid",
          datatype: "uuid",
          required: true
        },
        {
          field: "financeid",
          datatype: "integer",
          required: true,
          validation: {
            required: "finance required(select the finance to report)"
          }
        },
        {
          field: "month",
          datatype: "date",
          required: true,
          validation: {
            required: "month is required"
          }
        },
        {
          field: "offerings",
          datatype: "integer",
          required: true,
          validation: {
            required: "offerings is required"
          }
        },
        {
          field: "tithes",
          datatype: "integer",
          required: true,
          validation: {
            required: "tithes is required"
          }
        },
        {
          field: "seedfaith",
          datatype: "integer",
          required: true,
          validation: {
            required: "seedfaith is required"
          }
        },
        {
          field: "thanksgiving",
          datatype: "integer",
          required: true,
          validation: {
            required: "thanksgiving is required"
          }
        },
        {
          field: "annualthanksgiving",
          datatype: "integer",
          required: true,
          validation: {
            required: "annualthanksgiving is required"
          }
        },
        {
          field: "buildingprojects",
          datatype: "integer",
          required: true,
          validation: {
            required: "buildingprojects is required"
          }
        },
        {
          field: "otherprojects",
          datatype: "integer",
          required: true,
          validation: {
            required: "otherprojects is required"
          }
        },
        {
          field: "crusadeandmissionary",
          datatype: "integer",
          required: true,
          validation: {
            required: "crusadeandmissionary is required"
          }
        },
        {
          field: "ministrydeposits",
          datatype: "integer",
          required: true,
          validation: {
            required: "ministrydeposits is required"
          }
        },
        {
          field: "assetdisposal",
          datatype: "integer",
          required: true,
          validation: {
            required: "assetdisposal is required"
          }
        },
        {
          field: "interestincome",
          datatype: "integer",
          required: true,
          validation: {
            required: "interestincome is required"
          }
        },
        {
          field: "loanrepayedbydebtors",
          datatype: "integer",
          required: true,
          validation: {
            required: "loanrepayedbydebtors is required"
          }
        },
        {
          field: "loanreceived",
          datatype: "integer",
          required: true,
          validation: {
            required: "loanreceived is required"
          }
        },
        {
          field: "donationreceived",
          datatype: "integer",
          required: true,
          validation: {
            required: "donationreceived is required"
          }
        },
        {
          field: "uploads",
          datatype: "string",
          required: true,
          validation: {
            required: "uploads are required"
          }
        },
        {
          field: "notes",
          datatype: "string",
          required: false
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}, { config: { type: Sequelize.ARRAY(Sequelize.JSONB) } }),

  down: (queryInterface) => queryInterface.bulkDelete("Configs", null, {})
};
