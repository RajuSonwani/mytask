
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
    table.increments().primary();
    table.string('name', 255).notNullable();
    table.string('mobile').notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps(true, true);
    })
    .createTable('following', (table) => {
      table.increments().primary();
      table.integer('user01').unsigned();
      table.integer('user02');
      table.integer('status').defaultTo(0);
      table.foreign('user01').references('id').inTable('users');
      // table.foreign('user02').references('id').inTable('users');
      table.timestamps(true, true);
      })
    .createTable('blogs', (table) => {
      table.increments().primary();
      table.string('title', 255).notNullable();
      table.string('description', 255).notNullable();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').inTable('users');
      table.timestamps(true, true);
    })
    .createTable('thumbs', (table) => {
      table.increments().primary();
      table.integer('like');
      table.integer('dislike');
      table.integer('user_id');
      table.integer('blog_id').unsigned();
      table.foreign('blog_id').references('id').inTable('blogs');
      table.timestamps(true, true);
    })
   
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('following')
    .dropTableIfExists('blogs')
    .dropTableIfExists('thumbs');
};
