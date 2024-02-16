'use client';

import { KodeMono } from '@kadena/fonts';
import { maskValue } from '@kadena/react-ui';
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
  const maskedValue = maskValue(value, {
    headLength: startUnmaskedValues,
    tailLength: endUnmaskedValues,
    character: '.',
  });

  return (
    <div
      data-testid="accountName"
      className={classNames(className, valueContainer)}
    >
      {maskedValue}
    </div>
  );
};
