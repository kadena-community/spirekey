'use client';

import { Breadcrumbs, BreadcrumbsItem, Heading } from '@kadena/react-ui';
import { useParams } from 'next/navigation';

export default function AddDevice() {
  const params = useParams();

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbsItem href={`/accounts/${params.caccount}`}>
          {decodeURIComponent(params.caccount.toString())}
        </BreadcrumbsItem>
        <BreadcrumbsItem>
          Add device
        </BreadcrumbsItem>
      </Breadcrumbs>
      <Heading>Add Device</Heading>
    </>
  );
}
