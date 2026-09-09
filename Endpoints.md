Auth Endpoints

POST /auth/register

Body: { email: string, password: string }
Auth required: No
Response (201): { id, email } (never send the password back, even hashed)
Errors: 400 if email/password missing or malformed, 409 Conflict if email already exists

POST /auth/login

Body: { email: string, password: string }
Auth required: No
Response (200): { token, user: { id, email } }
Errors: 400 if fields missing, 401 if email/password don't match
Notes Endpoints

GET /notes

Query params: ?category=work&search=title&sort=newest
Auth required: Yes
Response (200): NoteType[] — but only notes belonging to the logged-in user
Errors: 401 if no/invalid token

GET /notes/:id

Auth required: Yes
Response (200): single NoteType
Errors: 401 unauthenticated, 403 if the note exists but belongs to someone else, 404 if it doesn't exist at all

POST /notes

Body: { title: string, category: string, content?: string }
Auth required: Yes
Response (201): the created NoteType (with id, date, isPin: false set by the backend)
Errors: 400 if title/category missing, 401 unauthenticated

PATCH /notes/:id

Body: any subset of { title, content, category }
Auth required: Yes
Response (200): the updated NoteType
Errors: 401 unauthenticated, 403 not the owner, 404 not found

DELETE /notes/:id

Auth required: Yes
Response (200 or 204): confirmation (e.g. { success: true })
Errors: 401 unauthenticated, 403 not the owner, 404 not found

PATCH /notes/:id/pin

Body: none needed (it's a toggle) — or { isPin: boolean } if you want explicit control
Auth required: Yes
Response (200): the updated NoteType
Errors: 401, 403, 404, and a specific 400/409 if the user already has 3 pinned notes


---- 

Set up this Neon project in the current working directory.

1. `npm i -g neon@latest && neon login`
2. `neon skills -y`
3. `neon mcp -y`
4. `neon link --project-id square-breeze-80875414 --branch production -y`
5. `neon config init`
6. Update `neon.ts`:

```ts
import { defineConfig } from "@neon/config/v1";

export default defineConfig({});
```

7. `neon deploy`