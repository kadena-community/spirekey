'use client';

import type { FC } from 'react';
import React, { useState } from 'react';
import {
  titleContainer,
  valueContainer,
  valueIconContainer,
} from './MaskedValue.css';
import { maskValue } from '@kadena/react-ui';
import { KodeMono } from '@kadena/fonts';

KodeMono();

export interface IMaskedValueProps {
  title?: string;
  value: string;
  startUnmaskedValues?: number;
  endUnmaskedValues?: number;
}

export const MaskedValue: FC<IMaskedValueProps> = ({
  title,
  value,
  startUnmaskedValues = 6,
  endUnmaskedValues = 4,
}): JSX.Element => {
  const maskedValue = maskValue(value, {
    headLength: startUnmaskedValues,
    tailLength: endUnmaskedValues,
  });

  return (
    <div data-testid="kda-masked-value">
      <div className={titleContainer}>{title}</div>
      <div className={valueIconContainer}>
        <div className={valueContainer}>{maskedValue}</div>
      </div>
    </div>
  );
};