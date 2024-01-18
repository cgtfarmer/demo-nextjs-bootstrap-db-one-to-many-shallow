import DbClient from '@/backend/client/db-client';

export default class StateRepository {

  static async findAll() {
    console.log('[StateRepository#findAll]');

    const results = await DbClient.executeStatement(`
      SELECT *
      FROM states
    `);

    const states = results[0];

    return states;
  }

  static async findById(id) {
    console.log(`[StateRepository#findById] ${id}`);

    const sql = `
      SELECT *
      FROM states
      WHERE id = ?
    `;

    const values = [id];

    const results = await DbClient.executeStatementWithParams(sql, values);

    const state = results[0][0];

    return state;
  }

  static async create(state) {
    console.log(`[StateRepository#create] ${state}`);

    const sql = `
      INSERT INTO states (name, symbol)
      VALUES (?, ?)
    `;

    const values = [
      state.name,
      state.symbol
    ];

    const results = await DbClient.executeStatementWithParams(sql, values);

    state.id = results[0].insertId;
    return state;
  }

  static async update(state) {
    console.log(`[StateRepository#update] ${state}`);

    const sql = `
      UPDATE states
      SET name = ?,
          symbol = ?,
      WHERE id = ?
    `;

    const values = [
      state.name,
      state.symbol,
      state.id
    ];

    await DbClient.executeStatementWithParams(sql, values);

    return state;
  }

  static async destroy(id) {
    console.log(`[StateRepository#destroy] ${id}`);

    const sql = `
      DELETE FROM states
      WHERE id = ?
    `;

    const values = [id];

    await DbClient.executeStatementWithParams(sql, values);
  }
}
