exports.up = function (knex) {
  return knex.schema
    .createTable("cohorts", (tbl) => {
      tbl.increments();
      // Index just make searching by that col much faster
      tbl.string("name", 255).notNullable().index();
    })
    .createTable("students", (tbl) => {
      tbl.increments();
      tbl.string("name", 255).notNullable().index();
      tbl.string("email", 255).notNullable().index();
    })
    .createTable("cohort_students", (tbl) => {
      tbl.increments();

      // FOREIGN KEY
      tbl
        .integer("cohort_id")
        .unsigned()
        .references("cohorts.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("student_id")
        .unsigned()
        .references("students.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl.date("joined_on");
      tbl.date("left_on");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("cohort_students")
    .dropTableIfExists("students")
    .dropTableIfExists("cohorts");
};
