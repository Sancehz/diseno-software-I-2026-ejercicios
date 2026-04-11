# 💘 Amantes API — Backend

API REST construida con **Node.js + Express + MongoDB** siguiendo arquitectura en capas.

## Estructura

```
src/
├── config/
│   ├── database.js       # Conexión a MongoDB
│   └── seed.js           # Datos iniciales automáticos
├── controllers/
│   └── amante.controller.js
├── services/
│   └── amante.service.js
├── repositories/
│   └── amante.repository.js
├── models/
│   └── amante.model.js
├── dtos/
│   └── amante.dto.js     # Validación de entrada/salida
├── routes/
│   └── amante.routes.js
└── index.js
```

## Requisitos

- Node.js 18+
- MongoDB corriendo localmente en `mongodb://localhost:27017`

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev    # Modo desarrollo con nodemon (hot-reload)
npm run start  # Producción
```

## Endpoints

### `POST /amantes`
Crea un nuevo perfil de amante.

**Body:**
```json
{
  "nombre": "Valentina Ríos",
  "edad": 28,
  "intereses": ["senderismo", "fotografía", "café"]
}
```

**Respuesta 201:**
```json
{
  "success": true,
  "message": "Perfil de amante creado exitosamente 💘",
  "data": { "_id": "...", "nombre": "...", ... }
}
```

### `GET /amantes?interes=café`
Lista amantes que comparten el interés especificado.

**Respuesta 200:**
```json
{
  "success": true,
  "total": 3,
  "data": [...]
}
```

## Validaciones (DTO)

- `nombre`: requerido, string, 2–100 caracteres
- `edad`: requerido, entero, 18–120
- `intereses`: requerido, array de strings no vacíos, al menos 1 elemento
- `interes` (query): requerido, string no vacío
