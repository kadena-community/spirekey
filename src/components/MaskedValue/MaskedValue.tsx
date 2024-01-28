'use client';

import type { FC } from 'react';
import React, { useState } from 'react';
import {
  valueContainer,
} from './MaskedValue.css';
import { maskValue } from '@kadena/react-ui';
import { KodeMono } from '@kadena/fonts';
import classNames from 'classnames';

KodeMono();

export interface IMaskedValueProps {
  value: string;
  startUnmaskedValues?: number;
  endUnmaskedValues?: number;
  className?: string;
}

export const MaskedValue: FC<IMaskedValueProps> = ({
  value,
  startUnmaskedValues = 6,
  endUnmaskedValues = 4,
  className = '',
}): JSX.Element => {
  const maskedValue = maskValue(value, {
    headLength: startUnmaskedValues,
    tailLength: endUnmaskedValues,
  });

  return (
    <div className={classNames(className, valueContainer)}>{maskedValue}</div>
  );
};
