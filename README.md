# Getting Started

### Installation

1. Clone this project
1. Run: `docker-compose run --rm app npm install`
1. Run: `docker-compose up -d` to bring up container(s)
1. Run: `docker-compose logs -f` to tail logs
1. Navigate to `http://localhost:3000/` in your browser

### Development

- Run: `docker-compose down; docker-compose up -d`
- Wait for stack to finish starting up

### Run Playwright Tests

Run: `docker-compose down; docker-compose up -d mysql; sleep 20; docker-compose run --rm app bash -c "npm install; npm run build; npm run start & sleep 5; npm run test-e2e"`

## Run Playwright Tests (w/ Stack Reuse)

- Leave dev stack running
- Run in another terminal: `docker-compose exec app npm run test-e2e` (repeat as needed)

### Endpoints

#### State CRUD

```
GET /api/states
POST /api/states

GET /api/states/:id
PUT /api/states/:id
DELETE /api/states/:id
```

#### User CRUD

```
GET /api/users
POST /api/users

GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
```

#### User Retrieval by State ID

```
GET /api/states/:id/users
```

#### State Summary Retrieval

(Aggregated User data by State)

```
GET /api/states/summary
GET /api/states/:id/summary
```
