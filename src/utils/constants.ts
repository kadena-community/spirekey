// L1 Accounts
export const l2GasStationAccount = `u:${process.env.NAMESPACE}.gas-station.enforce-guard-any:2_2Hme6mPWedofd8myNxsJ1cnHeujAFRQCc4VKEGBP8`;

// TODO: Have the user provide this
export const signerPubKey =
  '457117167173a2afafdd72fd05106eaee745a37d808476455d3b1a8acc9ad8d5';

// L2 Accounts
export const escrowAccount = `u:${process.env.NAMESPACE}.l2.sync-guard:DldRwCblQ7Loqy6wYJnaodHl30d3j3eH-qtFzfEv46g`;

export const gasStation = process.env.GAS_STATION || '';

export const genesisAccount = 'sender00';
export const genesisPubKey =
  '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca';
export const genesisPrivateKey =
  '251a920c403ae8c8f65f59142316af3c82b631fba46ddea92ee8c95035bd2898';

export const l1ChainId = process.env.CHAIN_ID;
export const l2ChainId = '2';
