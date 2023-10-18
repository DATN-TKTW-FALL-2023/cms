CMS website đặt vé xem phim Mofy

## Note

- Use `yarn` instead of `npm`.
- Don't forget to commit `yarn.lock` when you are adding new packages.

## How to Start

- `.env.development` copied from the wiki from the project's repository
- Create `.env.development.local` from `.env.development` with your own modifications:

```sh
git config core.autocrlf false
```

```sh
cp .env.development{,.local}
```

## Installation

```bash
yarn install
```

```sh
yarn prepare
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# Build
$ yarn build
```
