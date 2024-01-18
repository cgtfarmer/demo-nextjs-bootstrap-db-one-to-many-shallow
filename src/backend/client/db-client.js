import mysql from 'mysql2/promise';
import DbConfiguration from '../config/db-configuration';

export default class DbClient {

  static #dbConnection;

  static async getConnection() {
    if (this.#dbConnection != undefined) {
      console.log('[DatabaseConnection#getConnection] Connection already initialized, reusing...');
      return this.#dbConnection;
    }

    this.#dbConnection = await mysql.createConnection(DbConfiguration.getConfig());

    console.log('[DatabaseConnection#getConnection] Initializing...');
    await this.#dbConnection.connect();

    console.log('[DatabaseConnection#getConnection] Initialized');
    return this.#dbConnection;
  }

  static async executeStatement(sql) {
    console.log(`[DbClient#executeStatement] SQL: ${sql}`);
    const dbConnection = await this.getConnection();

    const results = await dbConnection.execute(sql);

    return results;
  }

  static async executeStatementWithParams(sql, values) {
    console.log(`[DbClient#executeStatement] SQL: ${sql}, VALUES: ${values}`);
    const dbConnection = await this.getConnection();

    const results = await dbConnection.execute(sql, values);

    return results;
  }
}
