import DbClient from '@/backend/client/db-client';

export default class UserRepository {

  static async findAll(stateId) {
    console.log(`[UserRepository#findAll] stateId=${stateId}`);

    let sql = `
      SELECT *
      FROM users
    `;

    if (stateId != undefined) sql += `WHERE stateId = ${stateId}`;

    const results = await DbClient.executeStatement(sql);

    const users = results[0];

    return users;
  }

  static async findById(id) {
    console.log(`[UserRepository#findById] ${id}`);

    const sql = `
      SELECT *
      FROM users
      WHERE id = ?
    `;

    const values = [id];

    const results = await DbClient.executeStatementWithParams(sql, values);

    const user = results[0][0];

    return user;
  }

  static async create(user) {
    console.log(`[UserRepository#create] ${user}`);

    const sql = `
      INSERT INTO users (firstName, lastName, age, weight, income, stateId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      user.firstName,
      user.lastName,
      user.age,
      user.weight,
      user.income,
      user.stateId
    ];

    const results = await DbClient.executeStatementWithParams(sql, values);

    user.id = results[0].insertId;
    return user;
  }

  static async update(user) {
    console.log(`[UserRepository#update] ${user}`);

    const sql = `
      UPDATE users
      SET firstName = ?,
          lastName = ?,
          age = ?,
          weight = ?,
          income = ?,
          stateId = ?
      WHERE id = ?
    `;

    const values = [
      user.firstName,
      user.lastName,
      user.age,
      user.weight,
      user.income,
      user.stateId,
      user.id
    ];

    await DbClient.executeStatementWithParams(sql, values);

    return user;
  }

  static async destroy(id) {
    console.log(`[UserRepository#destroy] ${id}`);

    const sql = `
      DELETE FROM users
      WHERE id = ?
    `;

    const values = [id];

    await DbClient.executeStatementWithParams(sql, values);
  }
}
