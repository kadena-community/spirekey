import {
  getFundSettings,
  getGasStationAndDeliverySettings,
  getL2DeploymentSettings,
  getNameSpaceAndKeysetSettings,
} from "./deploy-settings.mjs";
import deploy from "./deploy.mjs";

const IS_UPGRADE = true;

// Setup Keysets and Namespaces
await deploy(getNameSpaceAndKeysetSettings());
// Deploy L2 contracts on L1:14 and L2:2
await deploy(getL2DeploymentSettings(IS_UPGRADE));
// Deploy Gas Station and Delivery contracts on L2:2
await deploy(getGasStationAndDeliverySettings(IS_UPGRADE));
// Fund some coins to given accounts on L1:14
// Fund gas station on L2:2
await deploy(getFundSettings());
