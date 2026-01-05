# Matsya

Matsya is a decentralized exchange (DEX) frontend built with React, Redux, and ethers.js. It connects to on-chain Token and Exchange contracts using the ABIs in `src/abis` and the address map in `src/config.json`.

## Features
- MetaMask connection, account display, and balance lookup
- Network switching for localhost and Sepolia
- Market selector that loads token contracts per pair
- Hardhat setup for local blockchain development

## Tech stack
- React 18 + Redux
- ethers.js
- Hardhat + Waffle/Chai
- Create React App tooling

## Project structure
- `contracts/` Solidity contracts (currently only `Token.sol`)
- `scripts/` Hardhat deployment scripts
- `src/` React app, Redux store, ABIs, assets, styles
- `src/config.json` Chain IDs mapped to contract addresses

## Getting started

### Prerequisites
- Node.js 16+ and npm
- MetaMask (or another injected wallet)

### Install dependencies
```bash
npm install
```

### Run the UI
```bash
npm start
```
Open `http://localhost:3000`.

### Run a local chain (optional)
```bash
npx hardhat node
```

### Deploy contracts locally
```bash
npx hardhat run scripts/1_deploy.js --network localhost
```
After deployment, update `src/config.json` with the new addresses before opening the UI.

## Configuration

`src/config.json` maps chain IDs to contract addresses used by the UI. For local development (chain ID 31337), set:
- `Exchange.address`
- Token addresses for each market (e.g., `Chillar`, `Sukka`, `Morr`)

If you redeploy contracts, update these values. The Sepolia entry currently only contains an explorer URL, so it will show "Not Deployed to Network" until you add addresses.

## Smart contracts and ABIs

- `src/abis/Token.json` describes an ERC-20 interface.
- `src/abis/Exchange.json` describes the exchange interface.

Important: `contracts/Token.sol` is currently a minimal placeholder and does not match `src/abis/Token.json`. The UI calls ERC-20 methods like `symbol()` and `decimals()`, so deploy an ERC-20-compatible token and keep the ABI and address map in sync.

If you want to deploy the Exchange contract, add its source to `contracts/`, compile and deploy it, then update `src/abis/Exchange.json` and `src/config.json` accordingly.

## UI status

The current UI renders the Navbar and Market selector. Sections for orderbook, trades, balances, and charts are present in the layout but not yet implemented in components.

## Common issues
- "Not Deployed to Network": the active chain ID is missing from `src/config.json`.
- Token symbols fail to load: the token contract is not ERC-20 compatible with `src/abis/Token.json`.
- Stale addresses: redeploys require updated addresses in `src/config.json`.

## Scripts
- `npm start` Run the React app
- `npm test` Run CRA tests
- `npm run build` Create production build
- `npx hardhat node` Start a local blockchain
- `npx hardhat run scripts/1_deploy.js --network localhost` Deploy contracts
