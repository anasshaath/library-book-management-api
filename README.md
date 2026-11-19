# Library Book Management API

An in-memory REST API for managing library books. Data is reset whenever the server restarts.

## Setup (PowerShell)

```powershell
cd "C:\Users\pc world\Documents\Codex\backend\library-book-management-api"
npm ci
npm run dev
```

The server defaults to `http://localhost:3000`. Use `npm run build` to compile to `dist`, then `npm start` to run the compiled app.

## Exact Postman examples

For each request with JSON, select **Body** > **raw** > **JSON**.

### Create

`POST http://localhost:3000/api/books`

```json
{"title":"The Left Hand of Darkness","author":"Ursula K. Le Guin","genre":"Science fiction","available":true}
```

Expected: `201 Created`, including a server-generated `id`.

### List

`GET http://localhost:3000/api/books`

No body. Expected: `200 OK` and an array.

### Read one

`GET http://localhost:3000/api/books/<id>`

Replace `<id>` with the `id` from Create. Expected: `200 OK`.

### Update

`PATCH http://localhost:3000/api/books/<id>`

```json
{"available":false,"genre":"Speculative fiction"}
```

Expected: `200 OK`. Only supplied fields change.

### Delete

`DELETE http://localhost:3000/api/books/<id>`

No body. Expected: `204 No Content`.

### Error requests

Invalid input: `POST http://localhost:3000/api/books`

```json
{"title":"","author":"Octavia Butler","genre":"Science fiction","available":true}
```

Expected: `400 Bad Request`.

Missing book: `GET http://localhost:3000/api/books/not-a-real-id`

Expected: `404 Not Found`.

## AI assistance

AI helped scaffold the project structure, draft the Express/Zod implementation, and suggest the README examples. The requirements, code, and local endpoint checks were reviewed and verified by the project author.
