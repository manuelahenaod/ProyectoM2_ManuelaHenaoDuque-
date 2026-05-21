# MiniBlog API DevSpark

API REST para gestionar autores y posts de un blog. Permite operaciones CRUD completas sobre autores y publicaciones con relaciones entre tablas.

Proyecto construido con Node.js, Express, y PostgreSQL. Desplegado en Railway.

## URL Base

[proyectom2manuelahenaoduque-production.up.railway.app](proyectom2manuelahenaoduque-production.up.railway.app)

Todas las rutas están bajo `/api`.

## Tecnologías

- **Backend:** Node.js con Express
- **Base de datos:** PostgreSQL
- **ORM/Cliente DB:** pg (node-postgres)
- **Documentación:** OpenAPI 3.0 con Swagger UI
- **Test:** Vitest
- **Deployment:** Railway

## Endpoints

### Autores

- `GET /api/authors` - Obtener todos los autores
- `GET /api/authors/:id` - Obtener un autor específico
- `POST /api/authors` - Crear un nuevo autor
- `PUT /api/authors/:id` - Actualizar un autor existente
- `DELETE /api/authors/:id` - Eliminar un autor

### Posts

- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:id` - Obtener un post específico
- `GET /api/posts/author/:authorId` - Obtener posts de un autor
- `POST /api/posts` - Crear un nuevo post
- `PUT /api/posts/:id` - Actualizar un post existente
- `DELETE /api/posts/:id` - Eliminar un post

## Ejemplos de Uso

### Obtener todos los autores

```bash
curl https://proyectom2manuelahenaoduque-production.up.railway.app/api/authors
```

**Respuesta:**

```json
[
    {
        "id": 1,
        "name": "Ana García",
        "email": "ana@example.com",
        "bio": "Desarrolladora full-stack apasionada por Node.js",
        "created_at": "2026-05-21T00:31:11.154Z"
    },
    {
        "id": 2,
        "name": "Carlos Ruiz",
        "email": "carlos@example.com",
        "bio": "Escritor técnico especializado en bases de datos",
        "created_at": "2026-05-21T00:31:11.154Z"
    },
    {
        "id": 3,
        "name": "María López",
        "email": "maria@example.com",
        "bio": "Ingeniera de software con foco en APIs REST",
        "created_at": "2026-05-21T00:31:11.154Z"
    }
]
```

### Obtener un autor específico

```bash
curl https://proyectom2manuelahenaoduque-production.up.railway.app/api/authors/1
```

**Respuesta:**

```json
{
    "id": 1,
    "name": "Ana García",
    "email": "ana@example.com",
    "bio": "Desarrolladora full-stack apasionada por Node.js",
    "created_at": "2026-05-21T00:31:11.154Z"
}
```

### Crear un nuevo autor

```bash
curl -X POST https://proyectom2manuelahenaoduque-production.up.railway.app/api/authors \
  -H "Content-Type: application/json" \
  -d '\{
    "name": "María Rodríguez",
    "email": "maria.rodriguez@example.com",
    "bio": "Ingeniera de software especializada en APIs"
  \}'
```

**Respuesta:**

```json
{
    "id": 4,
    "name": "María Rodríguez",
    "email": "maria.rodriguez@example.com",
    "bio": "Ingeniera de software especializada en APIs",
    "created_at": "2026-05-21T18:07:30.249Z"
}
```

### Actualizar un autor

```bash
curl -X PUT https://proyectom2manuelahenaoduque-production.up.railway.app/api/authors/4 \
  -H "Content-Type: application/json" \
  -d '\{
    "bio": "Ingeniera de software y speaker internacional"
  \}'
```

**Respuesta:**

```json
{
    "id": 4,
    "name": "María Rodríguez",
    "email": "maria.rodriguez@example.com",
    "bio": "Ingeniera de software y speaker internacional",
    "created_at": "2026-05-21T18:07:30.249Z"
}
```

### Eliminar un autor

```bash
curl -X DELETE https://proyectom2manuelahenaoduque-production.up.railway.app/api/authors/4
```

**Respuesta:**

```json
{
  "message": "Autor eliminado exitosamente"
}
```

### Crear un post

```bash
curl -X POST https://proyectom2manuelahenaoduque-production.up.railway.app/api/posts \
  -H "Content-Type: application/json" \
  -d '\{
    "title": "Introducción a PostgreSQL",
    "content": "PostgreSQL es una base de datos relacional de código abierto...",
    "author_id": 1,
    "published": true
  \}'
```

**Respuesta:**

```json
{
  "id": 6,
  "title": "Introducción a PostgreSQL",
  "content": "PostgreSQL es una base de datos relacional de código abierto...",
  "author_id": 1,
  "published": true,
  "created_at": "2026-05-21T17:00:00.000Z"
}
```

### Obtener posts de un autor específico

```bash
curl https://proyectom2manuelahenaoduque-production.up.railway.app/api/posts/author/1
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "title": "Introducción a Node.js",
    "content": "Node.js es un runtime de JavaScript...",
    "author_id": 1,
    "published": true,
    "created_at": "2026-05-21T15:30:00.000Z"
  },
  {
    "id": 6,
    "title": "Introducción a PostgreSQL",
    "content": "PostgreSQL es una base de datos relacional de código abierto...",
    "author_id": 1,
    "published": true,
    "created_at": "2026-05-21T17:00:00.000Z"
  }
]
```
## Documentación Completa OpenAPI

La documentación interactiva completa de la API está disponible en:

**https://proyectom2manuelahenaoduque-production.up.railway.app/api-docs**

Ahí puedes:
- Ver todos los endpoints con detalles completos
- Probar endpoints directamente desde el navegador
- Ver esquemas de datos y ejemplos
- Entender parámetros opcionales y requeridos

## Ejecutar Localmente

### Prerrequisitos

- Node.js 20 o superior
- PostgreSQL 14 o superior

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/manuelahenaod/ProyectoM2_ManuelaHenaoDuque-.git
cd ProyectoM2_ManuelaHenaoDuque-
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Crea un archivo `.env` en la raíz del proyecto:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
PORT=3000
```

4. Configurar la base de datos:

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE blog_db;

# Ejecutar el script de setup
psql -U tu_usuario -d blog_db -f db/setup.sql

# Ejecutar el script de seed
psql -U tu_usuario -d blog_db -f db/seed.sql
```

5. Iniciar el servidor:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.

## Ejecutar Test

```bash
# Ejecutar todos los test
- npm test -- --run

# Ejecutar interfaz visual de Vitest
- npm run test:ui

# Coverage
- npm run test:coverage
```

##  Deployment en Railway

### Prerrequisitos
- Cuenta en Railway
- Cuenta en GitHub
- Proyecto subido a GitHub
- PostgreSQL funcionando localmente
- Variables de entorno configuradas

### Pasos
1. Entrar a Railway y crear un nuevo proyecto.
2. Agregar una base de datos PostgreSQL seleccionando:
```
- New Project
- Provision PostgreSQL
```
Railway generará automáticamente:

- HOST
- PORT
- USER
- PASSWORD
-DATABASE
```
 Internal URL de PostgreSQL
 DATABASE_URL: postgresql://postgres:password@postgres.railway.internal:5432/railway 
```

3. Verificar package.json en la sección scripts:
```bash
"scripts": {
  "start": "node server.js",
  "dev": "node --watch server.js"
}
```
Railway ejecuta npm start por defecto, así que el script start debe iniciar tu servidor

4. Conectar el repositorio de GitHub:
```
-New → GitHub Repo
-Seleccionar el repositorio del proyecto.
```
5. Configurar variables de entorno
- En el servicio de Express ir a:
```
Variables
```
- Agregar:
```bash
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
```
El nombre Postgres debe coincidir exactamente con el nombre del servicio PostgreSQL en Railway, ya que distingue mayúsculas y minúsculas.

6. Redesplegar la aplicación
* Después de agregar las variables, Railway normalmente redespliega automáticamente.

- Si no ocurre:
```
Ir a Deployments
Seleccionar Redeploy
```

7. Verificar logs del deployment
* En la pestaña Deployments se pueden revisar los logs para verificar que el servidor inició correctamente.

```
Ejemplo esperado:
Servidor corriendo en http://localhost:3000
```
8. Generar dominio público
```
Settings → Networking → Generate Domain
```
* Railway generará una URL pública similar a:
```
proyectom2manuelahenaoduque-production.up.railway.app
```
9. Probar la API desplegada
* Endpoint de autores:
```
proyectom2manuelahenaoduque-production.up.railway.app/api/authors
```
* Endpoint de posts
```
proyectom2manuelahenaoduque-production.up.railway.app/api/posts
```
* Documentación Swagger
```
proyectom2manuelahenaoduque-production.up.railway.app/api-docs
```
## Registro uso de la IA
### Prompt 1: 
Estoy creando una API REST, que gestiona autores y posts de un blog. Necesito separar toda la lógica en rutas, controllers y services. Dame un ejemplo corto para replicarlo en mi código

<p align ="center">
<img src="./images/prompt1.png" width="500">
</p>

### Prompt 2:
Para la API REST que estoy desarrollando, quiero centralizar errores. Por favor explicame el errorHandler brevemente

<p align ="center">
<img src="./images/prompt2.png" width="500">
</p>

### Prompt 3:
Estoy utilizando variables de entorno en mi proyecto. Explicame en un recuadro corto la diferencia entre dotenv y loadEnv y cómo usar cada uno

<p align ="center">
<img src="./images/prompt3.png" width="500">
</p>

* El resto de la ayuda utilizada se obtuvo de las lecture y homework realizadas en el Módulo 2 de Henry

