import StateRepository from '@/backend/repository/state-repository';

export default class StateController {

  static async index(req, res) {
    console.log('[StateController#index]');

    const response = await StateRepository.findAll();

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async show(req, res) {
    const { id } = req.query;
    console.log(`[StateController#show] ${id}`);

    const response = await StateRepository.findById(id);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async create(req, res) {
    const data = req.body;
    console.log(`[StateController#create] ${JSON.stringify(data)}`);

    const response = await StateRepository.create(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async update(req, res) {
    const { id } = req.query;
    const data = req.body;
    console.log(`[StateController#update] ${id}, ${JSON.stringify(data)}`);

    data.id = id;

    const response = await StateRepository.update(data);

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }

  static async destroy(req, res) {
    const { id } = req.query;
    console.log(`[StateController#destroy] ${id}`);

    await StateRepository.destroy(id);

    const response = { msg: 'Deleted successfully' };

    console.log(`Response: ${JSON.stringify(response)}`);
    res.status(200).json(response);
  }
}
