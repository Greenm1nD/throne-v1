# THRONE · VIP Gaming Club

Premium dark-royal casino dashboard prototype — Vue 3 · Vite · TypeScript · Tailwind CSS · GSAP.
Frontend only: no backend, no real payments, no gambling logic.

```bash
npm install
npm run dev    # http://localhost:5173
npm run build
```

## Credits

- Background ambience: **"Frozen Star" — Kevin MacLeod (incompetech.com)**,
  licensed under [Creative Commons: By Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).

## How the static auth works

There is **no backend** — "login" is fully client-side, but the UI behaves like a real
auth system:

- `src/composables/useAuth.ts` holds `user` and rehydrates it **synchronously** from
  `localStorage` (`throne.user`) at module load, *before* the first router guard runs —
  so refreshing on a protected page does not eject you.
- `auth.login()` fetches a hard-coded demo user through `src/services/api.ts` (a mock
  layer with an artificial delay so loading states are exercised), then persists it.
  `auth.logout()` clears the key.
- `src/router/index.ts` has a `beforeEach` guard: a guest hitting a route with
  `meta.requiresAuth` (the whole `/account` tree) is bounced home and the login modal
  opens automatically.
- The login chain: header **Log In** → `AuthModal` → `TwoFaModal` (any 6-digit code
  passes) → `auth.login()` → `/account`.

**Real backend integration point:** replace the bodies in `src/services/api.ts` with
HTTP calls. Components and the auth store only ever talk to `api.*`, so nothing else
needs to change.
