# RentNest Frontend Assignment Audit

## Scope
Reviewed the supplied frontend and backend source archives together. This is a
source review, not a live deployment or payment certification.

## Rubric status from source inspection

| Requirement | Finding |
|---|---|
| API integration + `API_INTEGRATION.md` | Endpoint map added. Several backend/frontend gaps are listed explicitly. |
| Consistent UI error handling | Partial. Many server actions catch errors and return messages, but some fetch actions do not use a shared helper and some can throw on network/JSON errors. |
| 20 meaningful conventional commits | Cannot be created or verified from the ZIP: the archive does not include usable Git history. Make real commits in the local repository. |
| Working deployed admin credentials | Backend package now includes an environment-driven `npm run seed:admin` command. A real deployed login still requires seeding the deployed database and testing the private credentials. |
| Real Stripe / SSLCommerz | Backend contains a real Stripe Checkout session integration. Live success/cancel flow is incomplete and cannot be certified without Stripe credentials and runtime testing. |
| Originality | Cannot be determined from source archives alone. |
| UI/UX and responsive behavior | Source contains pages/components, but visual responsiveness and interaction quality require browser testing at mobile/tablet/desktop sizes. |
| Loading skeletons, toast, theme | Sonner is present; loading/error files exist. A complete dark/light toggle and consistent skeleton coverage were not verified. |
| App Router and data fetching | Next.js App Router and native Fetch are used. No TanStack Query/SWR dependency is required for the current implementation. |
| Auth and role protection | Backend refresh/logout endpoints and current-role checks were added; property, rental, and payment ownership checks were added. Runtime role-flow testing is still required. |
| CRUD | Category, property, rental, admin and review APIs exist. Landlord's `/api/properties/my` frontend call has no matching backend route. |
| Payment | Stripe Checkout now uses BDT, includes rental months in the total, verifies success server-side, redirects on success/cancel, and allows retry. End-to-end test mode verification remains required. |
| Video | Not verifiable from the supplied source archives. |

## Changes made to this frontend package

- Corrected registration and current-profile endpoint paths to match the
  backend's `/api/auth` mount.
- Corrected the `LANDLORD` role comparison in login redirect logic.
- Corrected the Stripe checkout URL access to match the backend response shape.
- Added `API_INTEGRATION.md` with the implemented route matrix and unresolved
  integration items.

## Before submission

1. Add the missing backend routes and authorization checks listed in
   `API_INTEGRATION.md`.
2. Configure Stripe test/live keys and separate frontend/backend URLs; test
   success, cancel, retry, and payment history end to end.
3. Add a reproducible admin seed process and privately verify credentials on
   the deployed app. Do not publish a real password in the repository.
4. Test all user roles and CRUD flows against the deployed backend.
5. Test mobile/tablet/desktop layouts, loading states, toasts, validation, and
   error boundaries in a browser.
6. Create at least 20 genuine, incremental commits using conventional commit
   messages. Do not fabricate history or create empty commits just to reach 20.
7. Record the project walkthrough video and include its link where the
   assignment requires it.
