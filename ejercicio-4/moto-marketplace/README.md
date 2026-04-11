# 🏍️ Moto Parts Marketplace — API Serverless

API REST serverless para publicar y consultar partes de motos, usando **AWS Lambda** (simulado con `serverless-offline`) y **DynamoDB local**.

---

## 📁 Estructura del proyecto

```
moto-marketplace/
├── serverless.yml                  # Configuración Serverless Framework
├── package.json
├── seed/
│   └── partes.json                 # Datos iniciales (10 partes)
├── scripts/
│   └── seed.js                     # Script manual de seed
└── src/
    ├── config/
    │   └── dynamodb.js             # Cliente DynamoDB (local/prod)
    ├── models/
    │   └── Parte.js                # Modelo + validación de dominio
    ├── repositories/
    │   └── PartesRepository.js     # Capa de acceso a datos
    ├── services/
    │   └── PartesService.js        # Lógica de negocio
    ├── handlers/
    │   ├── crearParte.js           # Lambda: POST /partes
    │   └── listarPartes.js         # Lambda: GET /partes
    └── utils/
        └── response.js             # Helpers HTTP estándar
```

---

## 🏗️ Arquitectura

```
HTTP Request
     │
     ▼
┌─────────────────────┐
│   Handler (Lambda)  │  ← Punto de entrada serverless
│  crearParte.js      │
│  listarPartes.js    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   PartesService     │  ← Lógica de negocio
│  (business logic)   │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ PartesRepository    │  ← Acceso a datos (DynamoDB)
│  (repository)       │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│   DynamoDB Local    │  ← Base de datos (puerto 8000)
│   Tabla: MotoPartes │
└─────────────────────┘
```

---

## 🚀 Instalación y arranque

### 1. Instalar dependencias

```bash
npm install
```

### 2. Instalar DynamoDB local

```bash
npm run dynamodb:install
```

> Descarga el JAR de DynamoDB local en `.dynamodb/`

### 3. Levantar el entorno de desarrollo

```bash
npm run dev
```

Esto inicia simultáneamente:
- **DynamoDB Local** en `http://localhost:8000`
- **API REST** en `http://localhost:3000`

El plugin `serverless-dynamodb-local` crea la tabla `MotoPartes` y carga el seed automáticamente.

### 4. (Opcional) Seed manual

Si necesitas reinsertar los datos:

```bash
node scripts/seed.js
```

---

## 📡 Endpoints

### `POST /partes` — Registrar una parte

**Body JSON:**

```json
{
  "nombre": "Carburador Keihin 32mm",
  "tipo": "motor",
  "precio": 85.00,
  "descripcion": "Para motos 125-150cc (opcional)"
}
```

**Tipos válidos:** `motor`, `frenos`, `suspension`, `electrico`, `carroceria`, `transmision`, `escape`, `iluminacion`, `otro`

**Respuesta exitosa (201):**

```json
{
  "mensaje": "Parte registrada exitosamente.",
  "parte": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nombre": "Carburador Keihin 32mm",
    "tipo": "motor",
    "precio": 85,
    "descripcion": "Para motos 125-150cc",
    "fechaCreacion": "2025-01-20T10:30:00.000Z",
    "disponible": true
  }
}
```

**Respuesta con error (400):**

```json
{
  "error": "Solicitud inválida",
  "errores": [
    "El campo \"tipo\" es obligatorio. Valores permitidos: motor, frenos, ..."
  ]
}
```

---

### `GET /partes` — Listar partes

| Uso | Descripción |
|-----|-------------|
| `GET /partes` | Todas las partes |
| `GET /partes?tipo=motor` | Solo partes de tipo motor |
| `GET /partes?tipo=frenos` | Solo partes de tipo frenos |

**Respuesta (200):**

```json
{
  "mensaje": "Partes de tipo \"motor\"",
  "total": 2,
  "partes": [
    {
      "id": "seed-001",
      "nombre": "Carburador Keihin 32mm",
      "tipo": "motor",
      "precio": 85,
      "descripcion": "Carburador para motos 125-150cc",
      "fechaCreacion": "2025-01-10T10:00:00.000Z",
      "disponible": true
    }
  ]
}
```

---

## 🧪 Pruebas con curl

```bash
# Crear una parte
curl -X POST http://localhost:3000/partes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Llanta trasera 140/70-17","tipo":"otro","precio":65.00,"descripcion":"Llanta Pirelli Sport Demon"}'

# Listar todas las partes
curl http://localhost:3000/partes

# Filtrar por tipo
curl "http://localhost:3000/partes?tipo=motor"
curl "http://localhost:3000/partes?tipo=frenos"
curl "http://localhost:3000/partes?tipo=suspension"

# Error: body vacío
curl -X POST http://localhost:3000/partes \
  -H "Content-Type: application/json" \
  -d '{}'

# Error: tipo inválido
curl -X POST http://localhost:3000/partes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Algo","tipo":"rueda","precio":10}'
```

---

## 🧪 Pruebas con Postman / Insomnia

Importa esta colección base:

**Variables de entorno:**
- `baseUrl`: `http://localhost:3000`

**Requests sugeridos:**
1. `POST {{baseUrl}}/partes` — Con body JSON
2. `GET {{baseUrl}}/partes` — Sin parámetros
3. `GET {{baseUrl}}/partes?tipo=motor` — Con filtro

---

## 📦 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Levanta serverless-offline + DynamoDB local |
| `npm run dynamodb:install` | Descarga DynamoDB local |
| `npm run dynamodb:start` | Solo inicia DynamoDB local |
| `npm run seed` | Inserta datos de ejemplo manualmente |
| `npm run deploy:prod` | Deploy a AWS real (requiere credenciales) |

---

## 🗃️ Modelo de datos — DynamoDB

**Tabla:** `MotoPartes`

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `id` | String (PK) | UUID generado automáticamente |
| `nombre` | String | Nombre de la parte |
| `tipo` | String (GSI) | Categoría de la parte |
| `precio` | Number | Precio en dólares |
| `descripcion` | String | Descripción opcional |
| `fechaCreacion` | String | ISO 8601 |
| `disponible` | Boolean | Si está disponible |

**Índice secundario:** `tipo-index` (GSI) para consultas eficientes por tipo.

---

## ⚙️ Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `DYNAMODB_ENDPOINT` | `http://localhost:8000` | Endpoint de DynamoDB |
| `TABLE_NAME` | `MotoPartes` | Nombre de la tabla |
| `AWS_REGION` | `us-east-1` | Región (prod) |

---

## 📋 Requisitos

- Node.js 18+
- Java 8+ (para DynamoDB local)
- npm 8+
