import DbClient from '@/backend/client/db-client';

export default class StateSummaryRepository {

  static async findAll() {
    console.log('[StateSummaryRepository#findAll]');

    const sql = `
      SELECT S.id, S.name, S.symbol, COUNT(U.id) population,
        AVG(U.age) avgAge, AVG(U.weight) avgWeight, AVG(U.income) avgIncome
      FROM states S
      JOIN users U ON U.stateId = S.id
      GROUP BY S.id
    `;

    const results = await DbClient.executeStatement(sql);

    const stateSummaries = results[0];

    console.log(stateSummaries);

    return stateSummaries;
  }

  static async findById(id) {
    console.log(`[StateSummaryRepository#findById] ${id}`);

    const sql = `
      SELECT S.id, S.name, S.symbol, COUNT(U.id) population,
        AVG(U.age) avgAge, AVG(U.weight) avgWeight, AVG(U.income) avgIncome
      FROM states S
      JOIN users U ON U.stateId = S.id
      WHERE S.id = ?
      GROUP BY S.id
    `;

    const values = [id];

    const results = await DbClient.executeStatementWithParams(sql, values);

    const stateSummary = results[0][0];

    return stateSummary;
  }
}
