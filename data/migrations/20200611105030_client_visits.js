exports.up = function (knex) {
  return knex.schema
    .createTable("clients", (t) => {
      t.increments();
      t.string("name", 255).notNullable();
      t.string("email", 255).notNullable().index().unique();
    })
    .createTable("vehicles", (t) => {
      t.increments();
      t.string("make", 255).notNullable();
      t.string("model", 255).notNullable();
      t.integer("year").unsigned().notNullable();
      t.integer("client_id")
        .unsigned()
        .references("clients.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("visits", (t) => {
      t.increments();
      t.integer("vehicle_id")
        .unsigned()
        .references("vehicles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.date("visited_on").notNullable();
    })
    .createTable("services", (t) => {
      t.increments();
      t.string("name", 255).notNullable();
      t.integer("price").unsigned().notNullable();
    })
    .createTable("visit_details", (t) => {
      t.increments();
      t.integer("visit_id")
        .unsigned()
        .references("visits.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("service_id")
        .unsigned()
        .references("services.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      t.integer("total_paid").unsigned().notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("visit_details")
    .dropTableIfExists("services")
    .dropTableIfExists("visits")
    .dropTableIfExists("vehicles")
    .dropTableIfExists("clients");
};
