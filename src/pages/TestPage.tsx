/** @jsx jsx */
import { jsx } from '@emotion/core';
import PicarSuspense from '../components/PicarSuspense';
import SuspenseFallback from '../components/PicarSuspense/SuspenseFallback';

export default (function TestPage(): JSX.Element {
  return (
    <PicarSuspense>
      <SuspenseFallback />
    </PicarSuspense>
  );
});
