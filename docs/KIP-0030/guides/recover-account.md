# **Recover a Kadena Spirekey account**

After you register a Kadena SpireKey account, the account details are stored on
the blockchain and in the localStorage of your browser. When the localStorage of
your browser is cleared or you want to use your Kadena SpireKey account on
another browser, the [Kadena SpireKey wallet](https://spirekey.kadena.io) has no
way of knowing which of all the accounts stored on the blockchain belong to you.
However, the device you registered your account with still holds the passkey you
created to guard your account. Kadena SpireKey has a feature to recover your
account based on a passkey associated with your account. It works with the
passkey that you initially created your account with, but also with the passkey
of devices that you added to your account after registration. This guide walks
you through the process of recovering an account.

## Create an account

To demonstrate how account recovery works, create an account first, following
the steps in the [create account guide](create-account.md). Note that a passkey
is created with a name that is based on the `Alias` you provided and the
`Network` used by the wallet dApp. In developer mode, you can choose a `Network`
yourself. With an `Alias` "Alice" and `Network` "Testnet", you would see a
passkey with name "Alice (Testnet)" being created during the account creation
process.

## Clear localStorage

Visit [spirekey.kadena.io](https://spirekey.kadena.io) in the browser on your
computer. If you created an account on your phone in the previous step, the
localStorage of your computer's browser will not contain the details of your new
account. If you have created a new account in the browser on your computer, it
should be displayed in your wallet and you need to clear your localStorage in
order to follow along with this guide. In the latter case, open the developer
console of your browser and execute the following command:

```
localStorage.setItem('localAccounts', '[]')
```

Then, refresh the page. With no accounts in your localStorage, the wallet dApp
redirects you to the welcome page.

## Recover your account

Click the "Recover" button on the welcome page or visit
[spirekey.kadena.io/recover](https://spirekey.kadena.io/recover) directly. In
developer mode you have the option to select a specific `Network` to recover an
account from. Otherwise, the wallet dApp will default to the `Network` it is
configured with. Then, click the fingerprint button or "Next" to select a
passkey. If you created the account on your phone in the first step of this
guide, select "On other devices" and scan the QR-code to select a passkey.
Otherwise, directly select the passkey you created in the first step. Confirm
with your fingerprint or Face-ID and the wallet will start recovering your
account. If successful, you will automatically be redirected to the account
overview where you will see your account and all devices that guard it.

## How does it work?

The `webauthn-guard` module of the Kadena SpireKey smart contract emits a
`REGISTER_DEVICE` event containing an account name and credential identifier of
a passkey on every successful transaction containing a call to either the
`register` or `add-device` function. That is, every time your create an account
guarded by a passkey or add the passkey of a device to an existing account. This
allows the wallet dApp to query the Chainweb Data API for `REGISTER_DEVICE`
events containing the credential identifier of the passkey you select on the
account recovery page. If an event is found, the account name can be retrieved
from the event. Next, the wallet dApp executes a local transaction calling the
`get-webauthn-guard` function of the `webauthn-wallet` module with the retrieved
account name as the argument to retrieve all the details of the account from the
blockchain.
