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
  type: 'tx' | 'id' | 'confirm';
  data: any;
  connectionId: ConnectionId;
};

const ConnectionContext = createContext({
  connect: (id: ConnectionId) => {},
  send: (id: ConnectionId, message: Pick<Message, 'type' | 'data'>) => {},
  setId: (id: ConnectionId) => {},
  isLoading: true,
  messages: [] as Message[],
});

const getConnectionId = (id: ConnectionId) =>
  hash(id.publicKey + id.id).replace(/_/g, '-');

const isMessage = (data: any): data is Message => {
  return data.type === 'tx' || data.type === 'id' || data.type === 'confirm';
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
          console.log('Received data from peer connected I connected to', data);
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
  const { data: peer, isLoading } = useSWR<Peer | undefined>(
    id?.publicKey + id?.id,
    async (pid) => {
      if (!id) return;
      const { Peer } = await import('peerjs');
      const peerId = hash(pid).replace(/_/g, '-');
      const peer = new Peer(peerId);

      return new Promise((resolve) => {
        peer.on('open', () => {
          resolve(peer);
        });
      });
    },
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    },
  );
  useEffect(() => {
    if (!peer) return;
    peer.on('connection', (conn) => {
      setConnections((prev) => ({ ...prev, [conn.peer]: conn }));
      conn.on('open', () => {
        conn.on('data', (data) => {
          console.log('woooop', data);
          if (!isMessage(data)) return;
          console.log('Someone send me Data', data);
          setMessages((prev) => {
            const newMessages = [...prev, data];
            localStorage.setItem('messages', JSON.stringify(newMessages));
            return newMessages;
          });
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
