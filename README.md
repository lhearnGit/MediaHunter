This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Status 

As of 3 / 4 / 2025 

UI is  still rough and under-development, users may have poor experience on some mobile devices.
Some Features may not function properly, such as removal of an item from a user account.

## Configurating the ENV

create a .env in the application root with the following

# Authentication

As of 3/4/2025 this application only supports OAuth via gmail, manual configuration will be required to use additional OAuth service providers.
Auth.js - https://authjs.dev/getting-started

NEXTAUTH_URL=
NEXTAUTH_SECRET=
AUTH_TRUST_HOST=true

https://developers.google.com/identity/protocols/oauth2
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Datasources

https://api-docs.igdb.com/#getting-started
IGDB_CLIENT_ID=
IGDB_CLIENT_SECRET=

https://developer.themoviedb.org/docs/getting-started
TMDB_READ_TOKEN=

# Database
Prisma - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb
MONGO_URI=

# Other
SERVER_ROOT=







