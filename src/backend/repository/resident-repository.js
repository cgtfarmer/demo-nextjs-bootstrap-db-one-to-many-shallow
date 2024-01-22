import DbClient from '@/backend/client/db-client';

export default class ResidentRepository {

  static async findAll(stateId) {
    console.log(`[ResidentRepository#findAll] stateId=${stateId}`);

    let sql = `
      SELECT *
      FROM residents
    `;

    if (stateId != undefined) sql += `WHERE stateId = ${stateId}`;

    const results = await DbClient.executeStatement(sql);

    const residents = results[0];

    return residents;
  }

  static async findById(id) {
    console.log(`[ResidentRepository#findById] ${id}`);

    const sql = `
      SELECT *
      FROM residents
      WHERE id = ?
    `;

    const values = [id];

    const results = await DbClient.executeStatementWithParams(sql, values);

    const resident = results[0][0];

    return resident;
  }

  static async create(resident) {
    console.log(`[ResidentRepository#create] ${resident}`);

    const sql = `
      INSERT INTO residents (firstName, lastName, gender, age, weight, income, stateId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      resident.firstName,
      resident.lastName,
      resident.gender,
      resident.age,
      resident.weight,
      resident.income,
      resident.stateId
    ];

    const results = await DbClient.executeStatementWithParams(sql, values);

    resident.id = results[0].insertId;
    return resident;
  }

  static async update(resident) {
    console.log(`[ResidentRepository#update] ${resident}`);

    const sql = `
      UPDATE residents
      SET firstName = ?,
          lastName = ?,
          gender = ?,
          age = ?,
          weight = ?,
          income = ?,
          stateId = ?
      WHERE id = ?
    `;

    const values = [
      resident.firstName,
      resident.lastName,
      resident.gender,
      resident.age,
      resident.weight,
      resident.income,
      resident.stateId,
      resident.id
    ];

    await DbClient.executeStatementWithParams(sql, values);

    return resident;
  }

  static async destroy(id) {
    console.log(`[ResidentRepository#destroy] ${id}`);

    const sql = `
      DELETE FROM residents
      WHERE id = ?
    `;

    const values = [id];

    await DbClient.executeStatementWithParams(sql, values);
  }
}
