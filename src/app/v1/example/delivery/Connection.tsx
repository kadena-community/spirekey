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

const ConnectionContext = createContext({
  peers: [] as ConnectionId[],
  connect: (id: ConnectionId) => {},
  send: (id: ConnectionId, data: any) => {},
  setId: (id: ConnectionId) => {},
  isLoading: true,
});

const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<ConnectionId>(
    JSON.parse(localStorage.getItem('connectionId') || 'null') || undefined,
  );
  const [connections, setConnections] = useState<DataConnection[]>([]);
  const [peers, setPeers] = useState<ConnectionId[]>([]);
  const connect = async (id: ConnectionId) => {
    console.log('peer', peer);
    if (!peer) return;
    const connectionId = hash(id.publicKey + id.id).replace(/_/g, '-');
    return new Promise((resolve) => {
      const conn = peer.connect(connectionId);
      conn.on('open', () => {
        console.log('Connection opened', conn);
        setConnections((prev) => [...prev, conn]);
        setPeers((prev) => [...prev, id]);
        conn.on('data', (data: any) => {
          console.log('Data received', data);
        });
        resolve(conn);
      });
      conn.on('error', (err) => {
        console.log('Connection error', err);
      });
    });
  };
  const send = async (id: ConnectionId, data: any) => {
    if (connections.length === 0) {
      const conn = (await connect(id)) as DataConnection;
      conn.send(data);
      return;
    }
    connections.forEach((conn) => {
      console.log('Sending to', conn);
      conn.send(data);
    });
  };
  const onSetId = (id: ConnectionId) => {
    setId(id);
    localStorage.setItem('connectionId', JSON.stringify(id));
  };
  const { data: peer } = useSWR(
    id.publicKey + id.id,
    async (pid) => {
      if (!id) return;
      const { Peer } = await import('peerjs');
      const peerId = hash(pid).replace(/_/g, '-');
      console.log('Creating peer', peerId);
      const peer = new Peer(peerId);
      peer.on('connection', (conn) => {
        console.log('Connection received', conn);
        setConnections((prev) => [...prev, conn]);
        // todo extract id from conn
        conn.on('open', () => {
          console.log('Connection opened', conn);
          conn.on('data', (data) => {
            console.log('Data received', data);
          });
        });
        conn.on('error', (err) => {
          console.log('Connection error', err);
        });
      });
      return peer;
    },
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    },
  );
  return (
    <ConnectionContext.Provider
      value={{ peers, connect, send, setId: onSetId, isLoading: !peer }}
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
