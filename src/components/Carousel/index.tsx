/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { useStore, observer } from '../../stores';
import { FlickingEvent } from '@egjs/flicking';
import Flicking from '@egjs/react-flicking';

interface CraouselProps {
  index: number;
  children: React.ReactNode;
  onChangeIndex: (i: number) => void;
}

export default observer(function Craousel(props: CraouselProps): JSX.Element {
  const { index, children, onChangeIndex } = props;
  const { article } = useStore();
  const flickingRef = React.useRef(null);

  useEffect(() => {
    if (flickingRef?.current) {
      article.flickingMoveTo = (_index: number) => {
        (flickingRef.current as any).moveTo(
          _index,
          Math.abs(index - _index) > 1 ? 0 : 500,
        );
      };
    }
  }, [flickingRef.current, index]);

  return (
    <Self className="carousel-contener">
      <Flicking
        ref={flickingRef}
        tag="div"
        viewportTag="div"
        cameraTag="div"
        onChange={(e: FlickingEvent) => {
          onChangeIndex(e.index);
        }}
        classPrefix="eg-flick"
        deceleration={0.0075}
        horizontal={true}
        circular={false}
        infinite={false}
        infiniteThreshold={0}
        lastIndex={Infinity}
        threshold={40}
        duration={100}
        panelEffect={(x) => 1 - Math.pow(1 - x, 3)}
        inputType={['touch', 'mouse']}
        thresholdAngle={45}
        bounce={10}
        autoResize={false}
        adaptive={false}
        zIndex={2000}
        bound={false}
        overflow={true}
        hanger={'50%'}
        anchor={'50%'}
        gap={0}
        moveType={{ type: 'snap', count: 1 }}
        collectStatistics={true}
        defaultIndex={index}
      >
        {children}
      </Flicking>
    </Self>
  );
});

const Self = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;

  & > div,
  & > div > div {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;
