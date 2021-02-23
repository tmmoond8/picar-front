/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Carousel from '../Carousel';
import { CAROUSEL } from '../../types/constants';
import { useStore, observer } from '../../stores';
import { colors } from '../../styles';

const Album: React.FC<{ photos: string[]}> = ({ photos }) => {
  const { ui } = useStore();
  const [index, setIndex] = React.useState(0);
  return (
    <Wrapper>
      {ui.queryMatch.Mobile && (
        <MobileAlbum>
          <MobileNivigation>{`${index + 1}/${photos.length}`}</MobileNivigation>
          <Carousel 
            id={CAROUSEL.ARTICLE_ALBUM}
            index={index}
            onChangeIndex={(index: number) => setIndex(index)}
          >
            {photos.map((photo, index) => <li key={`${index}_${photo}`}><Image src={photo} /></li>)}
          </Carousel>
        </MobileAlbum>
      )}
      {!ui.queryMatch.Mobile && (
        <DesktopAlbum>
          {photos.map((photo, index) => <li key={`${index}_${photo}`}><Image src={photo} /></li>)}          
        </DesktopAlbum>
      )}
    </Wrapper>
  )
}

export default observer(Album);

const Wrapper = styled.div`
  margin: 0 0 0 -18px;
`;

const DesktopAlbum = styled.ul`
  margin: 37px -18px 0 -18px;

  li {
    height: 100%;
    width: 100%;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const MobileAlbum = styled.div`
  position: relative;
  height: 280px;
  width: 100vw;
  margin: 32px 0 0 0;
  list-style: none;
  li {
    height: 100%;
    width: 100%;
  }
`

const MobileNivigation = styled.div`
  position: absolute;
  top: 18px;
  right: 12px;
  z-index: 3000;
  color: ${colors.white};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.23;
  letter-spacing: 2px;
  padding: 6px 8px;
  border: solid 1px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  background-color: rgba(20, 20, 20, 0.6);
`;