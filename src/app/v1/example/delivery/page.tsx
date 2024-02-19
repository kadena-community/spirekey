'use client';

import { AccountButton } from '@/components/AccountButton';
import { Button } from '@/components/Button/Button';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { SubmitStatus, useSubmit } from '@/hooks/useSubmit';
import { Box, Stack, Text, TextField } from '@kadena/react-ui';
import { ChainId } from '@kadena/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useConnection } from './Connection';
import pizza from './pizza.png';
import margherita from './margherita.webp';
import pepperoni from './pepperoni.webp';
import veggie from './veggie.webp';
import hawaii from './hawaii.webp';
import pizzaHero from './pizza.webp';
import { createOrderId, useDelivery } from './useDelivery';
import { useLoggedInAccount } from './useLoggedInAccount';
import {pizzas, pizzasDeals, pizzasHero, pizzasHeroImg, pizzaOrder, pizzaButton, pizzasDealsList} from './order.css';
import pizzaBackground from "@/app/v1/example/delivery/pizzabackground.jpg";

type DeliveryProps = {
  searchParams: {
    user: string;
    transaction: string;
  };
};

const price = 2.55;
export default function DeliveryPage({ searchParams }: DeliveryProps) {
  const { user } = searchParams;
  const { tx } = useSubmit(searchParams);
  const { account } = useLoggedInAccount(user);
  const { messages, setId, send, isLoading } = useConnection();
  const { getReturnUrl } = useReturnUrl();
  const { orders, createOrder, saveDelivery } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.NETWORK_ID!,
  });
  const { status, doSubmit } = useSubmit(searchParams);

  const router = useRouter();
  const { register, getValues, watch } = useForm({
    defaultValues: {
      receiver: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      amount: 1,
    },
    reValidateMode: 'onChange',
  });

  const onSend = async () => {
    if (!account) return;
    const id = Date.now().toString();
    const tx = await createOrder({
      customerAccount: account.accountName,
      customerPublicKey: account.credentials[0].publicKey,
      merchantAccount: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      merchantPublicKey:
        'WEBAUTHN-a5010203262001215820c4518d145cd1ca74d6371dfd24fec692d770ef13335e299533e0cf2bd11286a2225820b956dd1d7d48d3bb4e3a47c0a1cd70c7e3751f0e3fabf50c58ab22fc07033950',
      deliveryPrice: 2.55,
      orderPrice: 2.55,
      orderId: id,
    });
    const orderId = createOrderId({
      customer: account.accountName,
      merchant: 'c:-BtZKCieonbuxQHJocDqdUXMZgHwN4XDNQjXXSaTJDo',
      orderId: id,
    });
    saveDelivery(orderId);
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  const deliverTx = [...messages].reverse().find((m) => m.type === 'tx');
  const onAcceptDelivery = async () => {
    if (!deliverTx) return;
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(deliverTx.data),
      ).toString('base64')}&returnUrl=${getReturnUrl('/v1/example/delivery')}`,
    );
  };

  useEffect(() => {
    if (isLoading) return;
    if (!account?.accountName) return;
    setId({ id: '1234', publicKey: account?.accountName });
  }, [account?.accountName, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!tx) return;
    if (deliverTx) return;
    const orderId = localStorage.getItem('newOrderId');
    if (!orderId) return;
    send(
      { id: '1234', publicKey: getValues('receiver') },
      { type: 'create', data: tx, orderId },
    );
  }, [tx, isLoading, deliverTx]);

  const isAcceptingOrder = tx && deliverTx?.data?.hash !== tx.hash;

  useEffect(() => {
    if (isLoading) return;
    if (status !== SubmitStatus.SUBMITABLE) return;
    if (isAcceptingOrder) return;
    doSubmit();
  }, [tx, isLoading, deliverTx, status]);

  const pendingTx = tx && !messages.some((m) => m.data.hash === tx.hash);
  const mintedTx = tx && messages.some((m) => m.data.hash === tx.hash);

  if (
    orders?.find((o) => o.orderId === localStorage.getItem('newOrderId'))
      ?.status === 'DELIVERED' &&
    tx
  )
    return (
      <Box margin="md">
        <div>Enjoy your pizza!</div>
      </Box>
    );

  if (status === SubmitStatus.SUCCESS)
    return (
      <Box margin="md">
        <div>Enjoy your pizza!</div>
      </Box>
    );
  if (status === SubmitStatus.LOADING)
    return (
      <Box margin="md">
        <div>Signing off...</div>
      </Box>
    );

  return (
    <div>
      <style jsx global>
        {
          `
          body {
            background-color: #000;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-image: url(${pizzaBackground.src});
          }
          `
        }
      </style>
      <header className={pizzasHero}>
        <img src="https://images.jsworldconference.com/devworld_b41c690105.png?width=60" alt="devworld pizza" />
        <h1>PIZZAWORLD</h1>
        <AccountButton className={pizzaButton} user={account} returnPath="/v1/example/delivery" />
      </header>
      {pendingTx && <Box margin="md">Order pending...</Box>}
      {mintedTx && <Box margin="md">Your pizza is on the way!</Box>}
      {isAcceptingOrder && deliverTx && (
        <Box margin="md">
          Sign off to receive your pizza!
          <Button onPress={onAcceptDelivery}>Sign off</Button>
        </Box>
      )}
      {!tx && (
        <article className={pizzaOrder}>
          <section>
             <h2>Delicious Pizzas Delivered Hot & Fresh</h2>
          </section>
          <section className={pizzasDeals}>
            <h3>Today's Specials</h3>
            <ul className={pizzas}>
              <li  className={pizzasDealsList}>
                <Image className={pizzasHeroImg} src={margherita} alt="Delicious peperoni Pizza"/>
                <div>$ 2.55</div>
              </li>
              <li className={pizzasDealsList}>
                <Image className={pizzasHeroImg} src={pepperoni} alt="Delicious margherita Pizza"/>
                <div>$ 2.55</div>
              </li>
              <li className={pizzasDealsList}>
                <Image className={pizzasHeroImg} src={veggie} alt="Delicious hawaii Pizza"/>
                <div>$ 2.55</div>
              </li>
              <li className={pizzasDealsList}>
                <Image className={pizzasHeroImg} src={hawaii} alt="Delicious veggie Pizza"/>
                <div>$ 2.55</div>
              </li>
            </ul>
          </section>
          <section className="how-it-works">
            <h3>How It Works</h3>
            <div className="steps">
              <div>1. Choose Your Pizza</div>
              <div>2. Sign for your order</div>
              <div>3. We Deliver</div>
              <div>4. Sign for your Delivery</div>
            </div>
          </section>
          <Stack gap="md" margin="md" flexDirection="column">
            <Button className={pizzaButton} onPress={onSend}>Place your order</Button>
          </Stack>
        </article>
      )}
    </div>
  );
}
