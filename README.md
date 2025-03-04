This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Summary 

This application is essentially a full re-write of the proto-type that is semi-live as of 3/4/2025

https://trackanything-bpum5n9dz-lucas-hearns-projects.vercel.app

Due to how this version handled requests, and IGDB and Accounts were handled, these sections will no longer function.

Movies and Shows are still available, however UI/UX is extremely rough.


# Status Update - As of 3 / 4 / 2025 


## Security 
User Authorization to actions is still under-development, application is not ready for public interaction.


## Potential Causes for Errors
### UI/UI
UI is still rough and under-development, users may have poor experience on some mobile devices.


### Fetching Data & Validation

Rate-Limiting - 
  Rate-Limiting has not been implemented, IGDB has Rate-Limits of 4 per second, extremely rapid requests may result in errors.

Validation - 
  Zod is a fairly recent implementation, testing to handle responses missing information required to render a component does not have full coverage at this time, reliability should be fairly high, but not absolute.
  


# Configurating the ENV

create a .env in the application root with the following

## Authentication

As of 3/4/2025 this application only supports OAuth via gmail, manual configuration will be required to use additional OAuth service providers.
Auth.js - https://authjs.dev/getting-started

NEXTAUTH_URL=
NEXTAUTH_SECRET=
AUTH_TRUST_HOST=true

https://developers.google.com/identity/protocols/oauth2
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

## Datasources

https://api-docs.igdb.com/#getting-started
IGDB_CLIENT_ID=
IGDB_CLIENT_SECRET=

https://developer.themoviedb.org/docs/getting-started
TMDB_READ_TOKEN=

## Database
Prisma - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb
MONGO_URI=

## Other
SERVER_ROOT=







