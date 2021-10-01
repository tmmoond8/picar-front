import React from 'react';
import SuspenseFallback from './SuspenseFallback';

export default function PicarSuspense({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>{children}</React.Suspense>
  );
}
