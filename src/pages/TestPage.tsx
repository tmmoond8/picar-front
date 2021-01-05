/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { LoungeList } from '../components/LoungeSelector';

export default (function TestPage(): JSX.Element {
  return <LoungeList handleSelect={() => console.log('selected')}/>;
});
