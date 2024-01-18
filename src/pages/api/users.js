import UserController from '@/backend/controller/user-controller';

async function handler(req, res) {
  console.log(`==> Router: START [${req.method}] ${req.url}`);

  switch(req.method) {
  case 'GET':
    await UserController.index(req, res);
    break;

  case 'POST':
    await UserController.create(req, res);
    break;

  default:
    res.status(400).json({ msg: 'Invalid route' });
  }

  console.log(`==> Router: END [${req.method}] ${req.url}`);
}

export default handler;
