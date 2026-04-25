# Motorcycle Parts API

A serverless REST API for trading motorcycle parts, built with Node.js, AWS Lambda, and DynamoDB.

## Architecture

The application follows a layered architecture:

- **Models**: Data entities with validation logic (`src/models/`)
- **Repositories**: Data access layer for DynamoDB (`src/repositories/`)
- **Services**: Business logic layer (`src/services/`)
- **Handlers**: Lambda function handlers (`src/handlers/`)

## Prerequisites

- Node.js 18.x or higher
- npm

## Installation

```bash
npm install
```

## Setup DynamoDB Local

Install DynamoDB local database:

```bash
npm run dynamodb:install
```

## Running the API

### Development Mode

Start the API in development mode with hot-reload and local DynamoDB:

```bash
npm run dev
```

This will start:
- Local DynamoDB on port 8000
- API server on port 3000 (http://localhost:3000)

The database will be automatically seeded with sample data.

### Production Mode

Deploy to AWS (requires AWS credentials configured):

```bash
npm run deploy
```

## API Endpoints

### Base URL (Development)
```
http://localhost:3000/dev
```

### 1. Create a Motorcycle Part

**Endpoint**: `POST /partes`

**Request Body**:
```json
{
  "name": "Filtro de aceite K&N premium",
  "type": "filtro",
  "price": 25.99
}
```

**Example with curl**:
```bash
curl -X POST http://localhost:3000/dev/partes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Escape Akrapovic completo",
    "type": "escape",
    "price": 850.00
  }'
```

**Response** (201 Created):
```json
{
  "message": "Part created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Escape Akrapovic completo",
    "type": "escape",
    "price": 850,
    "createdAt": "2024-01-25T10:30:00.000Z"
  }
}
```

### 2. Search Motorcycle Parts

**Endpoint**: `GET /partes?type={type}`

**Query Parameters**:
- `type` (optional): Filter parts by type (e.g., "freno", "filtro", "motor", "transmision")

**Example with curl** (all parts):
```bash
curl http://localhost:3000/dev/partes
```

**Example with curl** (filter by type):
```bash
curl http://localhost:3000/dev/partes?type=freno
```

**Response** (200 OK):
```json
{
  "message": "Found 3 parts of type \"freno\"",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "Pastillas de freno Brembo delanteras",
      "type": "freno",
      "price": 89.5,
      "createdAt": "2024-01-16T14:20:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440005",
      "name": "Pastillas de freno traseras EBC",
      "type": "freno",
      "price": 45,
      "createdAt": "2024-01-19T16:00:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440009",
      "name": "Disco de freno delantero flotante",
      "type": "freno",
      "price": 125,
      "createdAt": "2024-01-23T15:30:00.000Z"
    }
  ]
}
```

## Sample Data

The database is pre-seeded with 10 motorcycle parts across different categories:

- **filtro**: Oil and air filters
- **freno**: Brake pads and discs
- **transmision**: Chain, sprockets, clutch kits
- **motor**: Spark plugs, engine oil

## Part Types Available

- `filtro` - Filters
- `freno` - Brakes
- `transmision` - Transmission components
- `motor` - Engine parts
- `escape` - Exhaust systems

## Project Structure

```
motorcycle-parts-api/
├── src/
│   ├── handlers/
│   │   ├── createPart.js      # POST /partes handler
│   │   └── searchParts.js     # GET /partes handler
│   ├── services/
│   │   └── PartService.js     # Business logic
│   ├── repositories/
│   │   └── PartRepository.js  # DynamoDB data access
│   └── models/
│       └── Part.js            # Part model with validation
├── seed-data/
│   └── parts.json             # Initial data
├── scripts/
│   └── seed.js                # Database seeding script
├── serverless.yml             # Serverless configuration
└── package.json
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Successful GET request
- `201`: Successful POST request (resource created)
- `400`: Bad request (validation errors, invalid JSON)
- `500`: Internal server error

Example error response:
```json
{
  "error": "Validation failed: Price must be a positive number"
}
```

## Validation Rules

When creating a part, the following validations apply:

- `name`: Required, non-empty string
- `type`: Required, non-empty string
- `price`: Required, must be a positive number

## Manual Database Seeding

If you need to manually seed the database:

1. Ensure DynamoDB local is running
2. Run: `npm run seed`

## Troubleshooting

**Port already in use**:
If port 3000 or 8000 is already in use, you can modify the ports in `serverless.yml`:

```yaml
custom:
  serverless-dynamodb:
    start:
      port: 8000  # Change this
  serverless-offline:
    httpPort: 3000  # Change this
```

**DynamoDB not starting**:
Try reinstalling DynamoDB local:
```bash
npm run dynamodb:install
```

## Notes

- This setup runs completely locally and does not require AWS credentials
- All data is stored in-memory in DynamoDB local
- Data will be lost when the server stops (use the seed script to repopulate)
