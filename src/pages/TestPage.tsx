/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import APIS from '../apis';
import ActivationsContainer from '../components/Profile/ActivationsContainer';

export default (function TestPage(): JSX.Element {

  React.useEffect(() => {
    (async () => {
      const data = await APIS.spreadSheet.get();
    })();
  }, [])

  return <ActivationsContainer tab="article" userCode="phupdv3yb"/>;
});
