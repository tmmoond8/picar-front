/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Image from '../Image';

const Album: React.FC<{ photos: string[] }> = ({ photos }) => {
  const hasPhoto = React.useMemo(() => photos.length > 0, [photos]);
  return (
    <React.Fragment>
      {hasPhoto && (
        <PhotoList>
          {photos.map((photo, index) => <li key={`${index}_${photo}`}><Image src={photo} /></li>)}
        </PhotoList>
      )}
    </React.Fragment>
  )
}

export default Album;

const PhotoList = styled.ul`
  margin: 32px 0 0 -18px;
  width: calc(100% + 36px);
  li {
    height: 100%;
    width: 100%;
  }
`;
