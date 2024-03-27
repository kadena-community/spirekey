interface Event {
  requestKey: string;
}

interface Transaction {
  result: string;
  sender: string;
}

export const getAccountNameFromRegisterDeviceEvent = async (
  domain: string,
  credentialId: string,
): Promise<string> => {
  const events = await fetchEvents(domain, credentialId);

  if (events.length === 0) {
    throw new Error('No events found.');
  }

  try {
    const transaction = await fetchTransaction(domain, events[0].requestKey);
    return transaction.result === 'Write succeeded'
      ? transaction.sender
      : transaction.result;
  } catch (e: unknown) {
    throw new Error('No transaction found for event.');
  }
};

const fetchEvents = async (
  domain: string,
  credentialId: string,
): Promise<Event[]> => {
  try {
    const eventsResponse = await fetch(
      `${domain}/txs/events?param=${credentialId}&name=REGISTER_DEVICE&modulename=${process.env.NAMESPACE}.webauthn-guard`,
    );
    return await eventsResponse.json();
  } catch (e: unknown) {
    return [];
  }
};

const fetchTransaction = async (
  domain: string,
  requestKey: string,
): Promise<Transaction> => {
  const txResponse = await fetch(`${domain}/txs/tx?requestkey=${requestKey}`);
  return await txResponse.json();
};
