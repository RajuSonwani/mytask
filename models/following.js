const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

class Following extends (Model) {
    static get tableName() {
        return 'following'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user01',"user02"],
            properties: {
                id: { type: 'integer' },
                user01: {  type: 'integer' },
                user02: {  type: 'integer' },
                status: {  type: 'integer' }
            }
        }
    }
    static get relationMappings() {
        const Users = require('./users');
        return {
          users: {
            relation: Model.BelongsToOneRelation,
            modelClass: Users,
            join: {
              from: 'following.user01',
              to: 'users.id',
            },
          },
        };
      }
}

module.exports = Following;