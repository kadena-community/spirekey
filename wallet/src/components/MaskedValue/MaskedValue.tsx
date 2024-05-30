'use client';

import { KodeMono } from '@kadena/fonts';
import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import { valueContainer } from './MaskedValue.css';

KodeMono();

export interface IMaskedValueProps {
  value: string;
  startUnmaskedValues?: number;
  endUnmaskedValues?: number;
  className?: string;
}

export const MaskedValue: FC<IMaskedValueProps> = ({
  value,
  startUnmaskedValues = 4,
  endUnmaskedValues = 4,
  className = '',
}): JSX.Element => {
  const start = value.slice(0, startUnmaskedValues);
  const end = value.slice(-endUnmaskedValues);

  return (
    <span
      data-testid="accountName"
      className={classNames(className, valueContainer)}
    >
      {value.length <= startUnmaskedValues + endUnmaskedValues
        ? value
        : `${start}...${end}`}
    </span>
  );
};
