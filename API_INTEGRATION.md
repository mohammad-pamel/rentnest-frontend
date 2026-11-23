# RentNest API Integration Map

This document is based on the supplied `rentnest-frontend-main.zip` and
`rentnest-backend-main.zip`. It distinguishes implemented routes from frontend
calls that currently have no matching backend route.

## Base URL configuration

- Server-side frontend actions use `BACKEND_API_URL`.
- `app/lib/api.ts` also uses `NEXT_PUBLIC_API_URL`.
- Set both to the deployed backend origin when that helper is used:
  - `BACKEND_API_URL=https://<backend-origin>`
  - `NEXT_PUBLIC_API_URL=https://<backend-origin>`
- Backend CORS uses `FRONTEND_URL` (or the legacy `APP_URL` fallback) as the
  allowed frontend origin. Set it to the deployed frontend origin.
- Backend Stripe callbacks use `BACKEND_URL`; the backend then redirects to
  `FRONTEND_URL` payment pages. See the backend `.env.example`.

## Implemented endpoint map

| Method | Backend endpoint | Access | Frontend integration |
|---|---|---|---|
| POST | `/api/auth/register` | Public | `registerActions.ts` |
| POST | `/api/auth/login` | Public | `authActions.ts` |
| POST | `/api/auth/refresh-token` | Refresh token | `service/refreshToken.ts` |
| POST | `/api/auth/logout` | Public/token cookies | `service/logout.ts` (local cookie clearing) |
| GET | `/api/auth/me` | Logged-in user | `userActions.ts`, `service/getMe.ts`, `app/lib/api.ts` |
| GET | `/api/categories` | Public | `categoryActions.ts`, `app/lib/api.ts` |
| POST | `/api/categories` | ADMIN | `categoryActions.ts` |
| PATCH | `/api/categories/:id` | ADMIN | `categoryActions.ts` |
| DELETE | `/api/categories/:id` | ADMIN | `categoryActions.ts` |
| GET | `/api/properties` | Public | `propertyActions.ts`, `app/lib/api.ts` |
| GET | `/api/properties/my` | LANDLORD, ADMIN | `propertyActions.ts` |
| GET | `/api/properties/:id` | Public | `app/lib/api.ts` |
| POST | `/api/properties` | LANDLORD, ADMIN | `propertyActions.ts`, `app/lib/api.ts` |
| PATCH | `/api/properties/:id` | LANDLORD, ADMIN | `propertyActions.ts`, `app/lib/api.ts` |
| DELETE | `/api/properties/:id` | LANDLORD, ADMIN | `propertyActions.ts`, `app/lib/api.ts` |
| POST | `/api/rentals` | TENANT | `RentalRequestActions.ts`, `rentalActions.ts` |
| GET | `/api/rentals/my` | TENANT | `rentalActions.ts` |
| GET | `/api/rentals/landlord` | LANDLORD, ADMIN | `rentalActions.ts` |
| PATCH | `/api/rentals/:id` | LANDLORD, ADMIN | `rentalActions.ts` |
| POST | `/api/payments/create` | TENANT | `rentalActions.ts` / `PaymentButton.tsx` |
| GET | `/api/payments/success` | Stripe return endpoint | Backend verifies payment then redirects to frontend success page |
| GET | `/api/payments/cancel` | Stripe return endpoint | Backend marks pending payment failed then redirects to frontend cancel page |
| GET | `/api/payments/my` | TENANT | `paymentActions.ts` |
| POST | `/api/reviews` | TENANT | `reviewActions.ts` |
| GET | `/api/reviews/:propertyId` | Public | `reviewActions.ts` |
| GET | `/api/admin/users` | ADMIN | `adminActions.ts` |
| PATCH | `/api/admin/users/:id` | ADMIN | `adminActions.ts` |
| GET | `/api/admin/properties` | ADMIN | `adminActions.ts` |
| GET | `/api/admin/rentals` | ADMIN | `adminActions.ts` |

## Frontend corrections applied in this package

1. Registration now calls `/api/auth/register`. The backend mounts `userRoutes`
   under `/api/auth`, not `/api/users`.
2. Current-user/profile calls now use `/api/auth/me` for the same reason.
3. Login role comparison now checks the backend role value `LANDLORD` (the
   existing dashboard URL is spelled `/landloard-dashboard`; that route spelling
   was preserved to avoid breaking the current route tree).
4. `PaymentButton` reads `data.url.checkoutUrl`. The backend controller
   wraps the service result as `data: { url: { checkoutUrl } }`.
5. `service/refreshToken.ts` now stores the rotated access/refresh tokens in the
   frontend's HTTP-only cookies after a successful refresh.

## Backend fixes applied in the companion backend package

The companion backend archive now includes:

1. `GET /api/properties/my` and ownership checks for property update/delete.
2. `POST /api/auth/refresh-token` and `POST /api/auth/logout`.
3. Tenant ownership checks for payment creation and landlord ownership checks
   for rental status changes.
4. Stripe success/cancel callback redirects and retry support.
5. BDT checkout amount calculated as monthly rent multiplied by rental months.
6. Password omission from nested landlord/tenant API responses.
7. Current database role/status checks in backend authentication middleware.
8. An environment-driven admin seed command (`npm run seed:admin`).

The backend seed command does not provide a public/default password. Configure
private `ADMIN_*` environment variables and run the seed against the intended
database. The frontend's visible admin login can only be confirmed after that
account is seeded and the deployed app is tested.

## Verification boundary

This is a static source-code comparison of the two supplied ZIP archives. It
does not prove that the deployed backend environment variables, database,
Stripe account, admin account, CORS deployment settings, or live payment
callbacks are configured correctly. Those require runtime tests against the
deployed services.
