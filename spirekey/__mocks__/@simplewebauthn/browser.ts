const startRegistration = vi.fn().mockReturnValue({
  response: {
    publicKey: 'bW9ja2VkLXdlYmF1dGhuLWtleQ==',
    attestationObject: 'fakedata',
  },
});

module.exports = await vi.importActual<
  typeof import('@simplewebauthn/browser')
>('@simplewebauthn/browser');
export { startRegistration };
