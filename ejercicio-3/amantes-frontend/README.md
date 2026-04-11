# 💘 Amantes Ideal — Frontend

Cliente React con **Client Side Rendering** usando **Vite**.

## Estructura

```
src/
├── services/
│   └── amanteService.js   # Comunicación con la API REST
├── components/
│   └── AmanteCard.jsx     # Tarjeta de perfil
├── pages/
│   ├── BuscarPage.jsx     # Búsqueda por interés
│   └── CrearPage.jsx      # Formulario de registro
├── App.jsx                # Navegación por tabs
├── main.jsx               # Entry point React
└── styles.css             # Estilos globales
```

## Requisitos

- Node.js 18+
- Backend corriendo en `http://localhost:3001`

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev    # Servidor de desarrollo en http://localhost:5173
npm run build  # Build de producción
npm run start  # Preview del build (requiere npm run build primero)
```

## Funcionalidades

- **Buscar por interés**: Filtra candidatos por interés específico con sugerencias rápidas
- **Crear perfil**: Formulario validado para registrar nombre, edad e intereses
- **Diseño responsivo**: Adaptado para móvil y escritorio
