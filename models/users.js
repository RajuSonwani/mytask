const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

// unique email
const unique = require('objection-unique')({
    fields: ['mobile'],
    identifiers: ['id']
});

class Users extends unique(Model) {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['mobile'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                mobile:{type:'string'},
                email: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
    static get relationMappings() {
        const Blogs = require('./blogs');
        return {
          blogs: {
            relation: Model.BelongsToOneRelation,
            modelClass: Blogs,
            join: {
              from: 'users.id',
              to: 'blogs.users_id',
            },
          }
        };
      }
}
module.exports = Users;