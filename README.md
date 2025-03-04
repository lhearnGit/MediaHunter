This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Summary 

This application is essentially re-iteration of the proto-type I developed as my first attempt at any full-stack application.

https://trackanything-bpum5n9dz-lucas-hearns-projects.vercel.app

Due to how this version handled requests, User Accounts and Games will no longer function, as I was no-longer monitoring or actively working on that project, access was removed.

Movies and Shows are still available as the tokens have not changed, however UI/UX is essentially a mock-up.

I am to have a rough-working version within the next Month or Two, However,

I am also in the process of developing a simple LLM among other new responsiblities development has slowed.
https://github.com/lhearnGit/LLM

# Status Update - As of 3 / 4 / 2025 


## Security 
User Authorization to actions is still under-development, as such this application is not ready for public interaction, and should not be allowed to interact with any PII.


## Potential Causes for Errors
### UI/UI
UI is still rough and under-development, users may have poor experience on some mobile devices.


### Fetching Data & Validation

Rate-Limiting - 
  Rate-Limiting has not been implemented, IGDB has Rate-Limits of 4 per second, extremely rapid requests may result in errors.

Validation - 
  Zod is a fairly recent implementation, testing to handle responses missing information required to render a component does not have full coverage at this time, reliability should be fairly high, but not absolute.
  


# Setup & Configurating the .env

These instructions are by no means comprehensive on the process of deploying this application locally, and have not been fully tested. 
This is a summary of key information required for this application

1. Create an .env file at the project root
2. Set all of the .env values from the following steps, read the associated documentation in its entirety beforehand.

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







