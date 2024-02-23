'use client';

import { hash } from '@kadena/cryptography-utils';
import type Peer from 'peerjs';
import type { DataConnection } from 'peerjs';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

type ConnectionId = {
  id: string;
  publicKey: string;
};

export type Message = {
  type: 'tx' | 'id' | 'confirm' | 'orders' | 'create';
  data: any;
  connectionId: ConnectionId;
  orderId?: string;
};

const ConnectionContext = createContext({
  connect: (id: ConnectionId) => {},
  send: (
    id: ConnectionId,
    message: Pick<Message, 'type' | 'data' | 'orderId'>,
  ) => {},
  setId: (id: ConnectionId) => {},
  isLoading: true,
  messages: [] as Message[],
});

const getConnectionId = (id: ConnectionId) =>
  hash(id.publicKey + id.id).replace(/_/g, '-');

const isMessage = (data: any): data is Message => {
  return (
    data.type === 'tx' ||
    data.type === 'id' ||
    data.type === 'create' ||
    data.type === 'confirm' ||
    data.type === 'orders'
  );
};

const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(
    JSON.parse(localStorage.getItem('messages') || '[]'),
  );
  const [id, setId] = useState<ConnectionId>(
    JSON.parse(localStorage.getItem('connectionId') || 'null') || undefined,
  );
  const [connections, setConnections] = useState<
    Record<string, DataConnection>
  >({});
  const saveNewMessage = (message: Message) =>
    setMessages((prev) => {
      if (message.type === 'orders') return [...prev, message];
      if (message.type === 'id') return [...prev, message];
      if (
        prev.length &&
        prev.some((m) => {
          if (m.type === 'tx') return m.data.hash === message.data.hash;
          if (m.type === 'create') return m.data.hash === message.data.hash;
          if (m.type === 'confirm') return m.data.hash === message.data.hash;
        })
      )
        return prev;
      const newMessages = [...prev, message];
      localStorage.setItem('messages', JSON.stringify(newMessages));
      return newMessages;
    });
  const connect = async (id: ConnectionId) => {
    if (!peer) return;
    const connectionId = getConnectionId(id);
    return new Promise((resolve) => {
      const conn = peer.connect(connectionId, {
        serialization: 'json',
      });
      conn.on('open', () => {
        setConnections((prev) => ({ ...prev, [connectionId]: conn }));
        conn.on('data', (data: any) => {
          console.log('Someone send me Data', data);
          if (!isMessage(data)) return;
          saveNewMessage(data);
        });
        resolve(conn);
      });
      conn.on('error', (err) => {
        console.error('Connection error', err);
      });
    });
  };
  const send = async (
    toId: ConnectionId,
    message: Pick<Message, 'type' | 'data'>,
  ) => {
    const connectionId = getConnectionId(toId);
    const conn =
      connections[connectionId] || ((await connect(toId)) as DataConnection);
    console.log('Sending data to peer', message);
    conn.send({ ...message, connectionId: id });
  };
  const onSetId = (id: ConnectionId) => {
    setId(id);
    localStorage.setItem('connectionId', JSON.stringify(id));
  };
  const [peer, setPeer] = useState<Peer>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const createPeer = async () => {
      if (!id) return;
      const { Peer } = await import('peerjs');
      const peerId = getConnectionId(id);
      const peer = new Peer(peerId);

      peer.on('open', () => {
        setPeer(peer);
        setIsLoading(false);
      });
    };
    createPeer();
  }, [id]);
  useEffect(() => {
    if (!peer) return;
    peer.on('connection', (conn) => {
      setConnections((prev) => ({ ...prev, [conn.peer]: conn }));
      conn.on('open', () => {
        conn.on('data', (data) => {
          console.log('Someone send me Data', data);
          if (!isMessage(data)) return;
          saveNewMessage(data);
        });
      });
      conn.on('error', (err) => {
        console.error('Connection error', err);
      });
    });
  }, [peer]);
  return (
    <ConnectionContext.Provider
      value={{ connect, send, setId: onSetId, isLoading, messages }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};

export { ConnectionProvider, useConnection };
