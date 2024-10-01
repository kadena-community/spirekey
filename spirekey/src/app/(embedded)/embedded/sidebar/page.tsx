'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SidebarSign() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, '?'));
    if (params.get('transactions')) {
      redirect(`/sign#${window.location.hash}`);
    }
    if (params.get('networkId') && params.get('chainId')) {
      redirect(`/connect${window.location.hash}`);
    }
    redirect(`/connect${window.location.hash}`);
  });

  return null;
}
