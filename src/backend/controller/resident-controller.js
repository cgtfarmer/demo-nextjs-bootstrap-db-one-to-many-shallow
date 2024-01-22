import ResidentRepository from '@/backend/repository/resident-repository';

export default class ResidentController {

  static async index(req, res) {
    const { id } = req.query;
    console.log(`[ResidentController#index] stateId=${id}`);

    const response = await ResidentRepository.findAll(id);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const { id } = req.query;
    console.log(`[ResidentController#show] ${id}`);

    const response = await ResidentRepository.findById(id);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const data = req.body;
    console.log(`[ResidentController#create] ${JSON.stringify(data)}`);

    const response = await ResidentRepository.create(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const { id } = req.query;
    const data = req.body;
    console.log(`[ResidentController#update] ${id}, ${JSON.stringify(data)}`);

    data.id = id;

    const response = await ResidentRepository.update(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const { id } = req.query;
    console.log(`[ResidentController#destroy] ${id}`);

    await ResidentRepository.destroy(id);

    const response = { msg: 'Deleted successfully' };

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
