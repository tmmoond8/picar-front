/* eslint-disable @typescript-eslint/camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import PicarLoader from '../components/PicarLoader';

const LoadingPage = () => {
  return (
    <Page>
      <PicarLoader />
    </Page>
  );
}

export default LoadingPage;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;