import {
  getFundSettings,
  getL2DeploymentSettings,
  getNameSpaceAndKeysetSettings,
  getWalletSettings,
} from "./deploy-settings.mjs";
import deploy, { local } from "./deploy.mjs";

const IS_UPGRADE = false;

// Setup Keysets and Namespaces
await deploy(getNameSpaceAndKeysetSettings());
// Deploy L2 contracts on L1:14 and L2:2
await deploy(getL2DeploymentSettings(IS_UPGRADE));
await deploy(getWalletSettings(IS_UPGRADE));
// Fund some coins to given accounts on L1:14
// const accounts = await Promise.all(
//   ["andy", "steven", "ashwin", "jesse", "isa"].map(async (name) => ({
//     name,
//     cname: await local(
//       `(n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn.get-account-name "${name}")`,
//       "http://127.0.0.1:8080",
//       "fast-development",
//       "14"
//     ),
//     fund: 100,
//   }))
// );
await deploy(getFundSettings());
