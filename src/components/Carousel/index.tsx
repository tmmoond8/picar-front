/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { FlickingEvent } from '@egjs/flicking';
import Flicking from '@egjs/react-flicking';

interface CraouselProps {
  index: number;
  children: React.ReactNode;
  onChangeIndex: (i: number) => void;
}

export default function Craousel(props: CraouselProps): JSX.Element {
  const { index, children, onChangeIndex } = props;
  const flickingRef = React.useRef(null);

  React.useEffect(() => {
    if (flickingRef.current) {
      const cameraEl = (flickingRef.current as any)
        .cameraElement as HTMLDivElement;
      cameraEl.style.transform = `translate3d(${
        -1 * index * window.innerWidth
      }px, 0px, 0px)`;
    }
  }, [index]);

  return (
    <Self className="carousel-contener">
      <Flicking
        ref={flickingRef}
        tag="div"
        viewportTag="div"
        cameraTag="div"
        onMoveEnd={(e: FlickingEvent) => {
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
        overflow={false}
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
}

const Self = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;

  & > div,
  & > div > div {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
`;
