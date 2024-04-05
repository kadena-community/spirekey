# **Create a Kadena Spirekey account**

You can create a Kadena SpireKey account on
[spirekey.kadena.io](https://spirekey.kadena.io). If you have not created a
Kadena SpireKey account before, you will be redirected to the
[Welcome page](https://spirekey.kadena.io). On the Welcome page you can choose
to either recover an account, which is explained in another guide, or register a
new account. Click the `Register` button to enter the registration flow and
create a new Kadena SpireKey account.

## Registration flow

The registration flow comprises five steps:

1. Alias
2. Network
3. Passkey
4. Device type
5. Color

You can navigate back to the previous step from each step of the registration
flow and cancel the registration from the `Alias` step. A new account will only
be created on the blockchain after you have completed the last step. All the
information you provide during registration will be stored on the blockchain.

### Alias

On the `Alias` step you provide a human-readable name for your account. This
enables you to easily recognize your account in your Kadena SpireKey wallet,
which is particularly useful once you have added more accounts to your wallet.
The `Alias` is only stored on your device and cannot been seen by others. Click
`Next` to proceed to the next step of the registration flow or `Cancel` to exit
the registration flow.

### Network

On the `Network` step you select the network to create your account on.
Currently, the options are:

- Mainnet
- Testnet
- Devnet

In the future, it will be possible to configure custom networks as well.

#### Note for wallet developers

You may have noticed that the `Network` step is missing on
[spirekey.kadena.io](https://spirekey.kadena.io/register). That is because the
deployment of this wallet dApp is configured with the environment variable
`WALLET_NETWORK_ID` set to `testnet04`. This forces users to create an account
on the respective network. Therefore the `Network` step of the registration flow
does not need to be presented to the user. The preselected network (`Testnet`)
is displayed on the account preview card at the top of the page, so you are
aware which network you are creating an account on.

It is possible to override the `WALLET_NETWORK_ID` configuration for development
purposes. Open the developer console of your browser and enter the following
command in the console:

```javascript
localStorage.setItem('devMode', true);
```

When you refresh the page, you will see that the registration flow now does
include the `Network` step.

### Passkey

On the `Passkey` step you create a Webauthn credential on the device that you
are currently using to register an account. A private key will be stored
encrypted on your device, protected with your biometric data, such as your
fingerprint or Face ID, depending on what is available on your device. Only the
public key and credential identifier associated with this private key will be
stored on the blockchain upon completing the registration flow. This ensures
that no sensitive information will be stored publically on the blockchain.

### Device type

A Kadena SpireKey account has one or more devices, but initially it will only
have the one device you created a Webauthn credential with in the previous step.
Adding and removing devices of an account will be explained in another guide. To
help you recognize your device among other devices associated with an account
you must choose a `Device type` in this step. You can choose one of the
following options:

- phone
- desktop
- security key

### Color

On the `Color` step you pick a color to make your device even more recognizable
among other devices with your account. This is particularly useful when you add
more than one device of the same device type. The `Color` step is the final step
of the registration flow. Press the `Complete` button to send a transaction to
the blockchain and definitively create your new account.

## Registration completed

After completing the registration flow you are redirected back to the main page
of [Kadena SpireKey](https://spirekey.kadena.io). Instead of the welcome screen
that was presented before you created your first account, you will now see a
card representing your newly created account. While the registration transaction
is being mined, the name of your account - the `c:account` - will be presented
in an animated state. Once the registration transaction has been mined, the
animation will stop and the `c:account` will be displayed. Part of the account
name will be masked for display purposes. Press the copy button to the right of
the account name and paste it anywhere to see the full account name. At this
point you have a fully functional Kadena SpireKey account guarded by a WebAuthn
credentials. You can use this account to connect your account to dApps that
integrate with Kadena SpireKey and sign transactions initiated by those dApps.
