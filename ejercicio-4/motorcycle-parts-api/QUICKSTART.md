# Quick Start Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Install DynamoDB Local

```bash
npm run dynamodb:install
```

## 3. Start the API

```bash
npm run dev
```

Wait for the output:
```
Serverless: DynamoDB - created table motorcycle-parts-api-parts-dev
Serverless: Offline [http for lambda] listening on http://localhost:3002
   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │   POST | http://localhost:3000/dev/partes                              │
   │   GET  | http://localhost:3000/dev/partes                              │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘
```

## 4. Test the API

### Create a new part:

```bash
curl -X POST http://localhost:3000/dev/partes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Neumático Michelin Road 5",
    "type": "neumatico",
    "price": 175.00
  }'
```

### Get all parts:

```bash
curl http://localhost:3000/dev/partes
```

### Search by type (freno):

```bash
curl http://localhost:3000/dev/partes?type=freno
```

### Search by type (motor):

```bash
curl http://localhost:3000/dev/partes?type=motor
```

## Available Part Types in Seed Data

- `filtro` - Filters (2 items)
- `freno` - Brakes (3 items)
- `transmision` - Transmission (3 items)
- `motor` - Engine parts (2 items)

That's it! Your API is ready to use. 🏍️
