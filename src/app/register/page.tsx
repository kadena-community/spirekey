'use client';

import { useState } from 'react';
import { Color } from './steps/Color';
import { Fingerprint } from './steps/Fingerprint';
import { Icon } from './steps/Icon';
// import { useForm } from 'react-hook-form'; // @ TODO

export default function Account() {
  const [info, setInfo] = useState({
    caccount: null,
    icon: null,
    color: null,
  });

  if (!info.caccount) {
    return <Fingerprint />;
  }

  if (!info.icon) {
    return <Icon />;
  }

  if (!info.color) {
    return <Color />;
  }
}
