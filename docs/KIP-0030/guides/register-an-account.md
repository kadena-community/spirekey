---
title: Register a Kadena SpireKey account
description:
  Whether you're a user or developer, creating a Kadena SpireKey account is the
  first step to using simplified WebAuthN authentication and authorization
  services.
menu: Authentication and authorization
label: Register an account
order: 2
layout: full
---

# Register a device to create a new Kadena SpireKey account

Whether you're a user or developer, creating a Kadena SpireKey account is the
first step to using simplified WebAuthN authentication and authorization
services. Registering for an account stores all of the account information you
provide on the blockchain after registration is complete. Secret information is
encrypted and stored with the authentication method of the device you use to
register. Secret information is not stored on the blockchain with your account
information.

To register for a new Kadena SpireKey account:

1. Open [Kadena SpireKey](https://spirekey.kadena.io) in a web browser on your
   phone, tablet, or desktop.
2. Click **Register** to start entering your account information.
3. Type an **Alias** to use for your account, then click **Next**.

   The alias is typically a short and distinguishable name that helps you
   recognize your account in the Kadena SpireKey wallet and to distinguish
   between accounts if you add more than one account to your wallet.

   The **Alias** you specify is only stored on the device you use to register
   and cannot been seen by anyone else. If you don't want to create an account,
   click **Cancel** to exit the registration flow.

4. Create a private **Passkey** to be stored in encrypted form on the device you
   are using to register an account.

   The encrypted **Passkey** is a WebAuthN credential that's protected with
   biometric data—such as a fingerprint or facial recognition—or a security key
   depending on the options available on the device you're using to register.
   Only the public key and credential identifier associated with the private
   passkey are stored on the blockchain after completing the account
   registration. No sensitive information is transferred to or stored on the
   Kadena blockchain or visible to the public.

5. Select a **Device Type** for this device and passkey combination to help you
   distinguish this device and passkey combination for the account from other
   devices and passkeys you might add to the account in the future.

   For example, you might use a laptop with a security key to register your
   account initially, then add a phone with a QR code to your account. The
   devices are associated with the same account but have different passkeys. You
   can use the device type to help you distinguish between the different devices
   associated with your account.

   Depending on the device and passkey combination, you can select from the
   following device types:

   - Security key
   - Phone
   - Desktop

   After you select the device type, click **Next**.

6. Select a **Color** for this device and passkey combination to help you
   distinguish this device and passkey combination rom other devices and
   passkeys you might add to the account in the future.

7. Click **Complete** to send a transaction to the blockchain and create your
   new account.

## Complete registration

After you click Complete, Kadena SpireKey displays your Accounts page with a
card representing your account information. While the registration transaction
is processed, the account name—a string with the c: prefix—is presented in an
animated state. After the registration transaction is successfully mined into a
block, the animation stops to indicate that you have a fully functional Kadena
SpireKey account guarded by a WebAuthn credential. You can use this account to
connect to any applications that integrate with Kadena SpireKey and use your
WebAuthn credential to sign transactions initiated by those applications.

The card representing your account information only displays the beginning and
end of the c: account name. You can click Copy to the right of the account name
to copy and paste the full account name whenever needed.

From the Accounts page, you can also view, send, or request transfers.

## Select a network

The Kadena SpireKey wallet is currently configured to create all new accounts on
the Kadena test network (Testnet). The network information is always displayed
on the account preview card, so you know the network you are creating an account
on. In the future, you'll be able to select a specific network when registering
an account.

If you are doing application or wallet development, you can override the preset
network configuration for development purposes.

To override the network configuration:

1. Open [Kadena SpireKey](https://spirekey.kadena.io) in a new Incognito or
   Private browser window.
2. Open the Developer Tools.
3. Open the Console and type the following command:

   ```javascript
   localStorage.setItem('devMode', true);
   ```

4. Refresh the browser, then click **Register** to complete the registration
   with the option to select the development network.

## Integrate with Kadena SpireKey

As an application developer, there are three basic integration points between a
decentralized application and Kadena SpireKey. To integrate with Kadena
SpireKey, your application needs to enable users to perform the following steps:

- Register an account on Kadena SpireKey by authenticating in Kadena SpireKey
  using a Web Authentication (WebAuthn) method.
- Log in using a Kadena SpireKey account.
- Sign transactions created by the application using a Kadena SpireKey account.

### Register or sign in using a Kadena SpireKey account

You can enable users to register or sign in with a Kadena SpireKey account from
your application by creating a link to the `/connect` endpoint for the Kadena
SpireKey wallet and specifying a return URL with appropriate parameters to
return the user to your application.

The following example illustrates an application running locally on
`http://localhost:3000` that's deployed on the `testnet04` network:

https://spirekey.kadena.io/connect?returnUrl=http://localhost:3000&networkId=testnet04

As you see in this example, the `returnUrl` is a URL-encoded query parameter
that the Kadena SpireKey wallet uses to redirect users after they connect. When
users are redirecting to the `/connect` endpoint, the Kadena SpireKey wallet
checks whether they have a Kadena SpireKey account. If they have at least one
account, they select the account they want to use to connect to your
application. Users who don't have a Kadena SpireKey account are automatically
redirected to the `/register` endpoint so they can follow the steps to register
an account. After completing the registration, they are redirected back to your
application with the newly-created account selected.

### Specifying the network in the query parameter

In many cases, applications are only deployed on a specific network. For
example, your application might only allow transactions on the development test,
or main Kadena network. If users attempt to connect and complete transactions in
an application running on Testnet with an account they created on the
development network, the transaction will fail.

To prevent this type of transaction failure, you can specify the `networkId`
that users can select an account from as a query parameter when connecting to
the Kadena SpireKey wallet URL. In the example URL above, the value of this
query parameter is set to `testnet04`. You can change the value to mainnet01 or
development as needed.
