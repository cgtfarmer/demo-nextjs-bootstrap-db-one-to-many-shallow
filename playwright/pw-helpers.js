class PwHelpers {

  static async createDefaultState(request) {
    const response = await request.post('/api/states', {
      data: {
        name: 'Nebraska',
        symbol: 'NE',
      }
    });

    return await response.json();
  }

  static async createDefaultUser(request) {
    const createStateBody = await this.createDefaultState(request);

    const createUserResponse = await request.post('/api/users', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
        weight: 185.3,
        income: 50000.0,
        stateId: createStateBody.id,
      }
    });

    return await createUserResponse.json();
  };

  static async createDefaultUserWithStateId(request, stateId) {
    const createUserResponse = await request.post('/api/users', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
        weight: 185.3,
        income: 50000.0,
        stateId: stateId
      }
    });

    return await createUserResponse.json();
  };
}

module.exports = PwHelpers;
