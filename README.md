# testing wagmi

Quick example of how to write tests for [wagmi](https://github.com/wagmi-dev/wagmi) using [React Testing Library](https://github.com/testing-library/react-testing-library) and [Playwright](https://github.com/microsoft/playwright).

## Getting started

1. Clone repository and install dependencies:

```bash
pnpm install
```

2. Install [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) to run local Ethereum node.
3. Add environment variables from `.env.example` (recommened to use [direnv](https://direnv.net))
4. Run dev server

```bash
pnpm dev
```

## Unit/integration tests

Unit and integration tests are run by [Vitest](https://vitest.dev) and rendered with a [custom `render` function](https://testing-library.com/docs/react-testing-library/setup/#custom-render) from React Testing Library. See [`components/Connect.test.tsx`](/components/Connect.test.tsx) and [`components/SendTip.test.tsx`](/components/SendTip.test.tsx) for more info.

### Run

1. Start Anvil in terminal session

```bash
pnpm anvil
```

2. Start Vitest in watch mode in different terminal session

```bash
pnpm test
```

## End-to-end tests

End-to-end tests use [Playwright](https://github.com/microsoft/playwright). See [`test/pages/index.test.ts`](/test/pages/index.test.ts) for more info.

### Run

1. Start Anvil in terminal session

```bash
pnpm anvil
```

2. Start dev server in different terminal session (make sure `NEXT_PUBLIC_PLAYWRIGHT_ENABLED` is set to `true`)

```bash
pnpm dev
```

3. Start Playwright test runner

```bash
pnpm test:e2e
```
