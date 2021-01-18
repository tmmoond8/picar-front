/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

const Advertisement: React.FC<{}> = () => {

  return (
    <AdLink href="https://www.woowahan.com/?page_id=6643" target="_blank"/>
  );
};

export default Advertisement;

const AdLink = styled.a`
  display: block;
  width: 264px;
  height: 128px;
  margin-top: 16px;
  background: url('https://scontent-ssn1-1.xx.fbcdn.net/v/t1.0-9/11825906_952980768058568_3379577900379398016_n.jpg?_nc_cat=103&ccb=2&_nc_sid=8024bb&_nc_ohc=1W13iwqN7oYAX8iR6pu&_nc_ht=scontent-ssn1-1.xx&oh=8201dc8c4baa27ccf1c886f751301740&oe=6029A2FD') no-repeat;
  background-position: 0 -32px;
  background-size: cover;
  cursor: pointer;
`;