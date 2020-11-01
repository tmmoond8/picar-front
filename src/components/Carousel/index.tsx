/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import cx from 'classnames';

import { FlickingEvent } from '@egjs/flicking';
import Flicking from '@egjs/react-flicking';
import { useStore, observer } from '../../stores';
import { CAROUSEL } from '../../types/constants';

interface CraouselProps {
  id: keyof typeof CAROUSEL;
  className?: string;
  index: number;
  children: React.ReactNode;
  gesture?: boolean;
  onChangeIndex: (i: number) => void;
}

export default observer(function Craousel(props: CraouselProps): JSX.Element {
  const {
    id,
    className,
    index,
    children,
    onChangeIndex,
    gesture = true,
  } = props;
  const { article } = useStore();
  const flickingRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (flickingRef?.current && article) {
      (window as any).__OWNER__[id] = (_index: number) => {
        (flickingRef.current as any).moveTo(
          _index,
          Math.abs(index - _index) > 1 ? 0 : 500,
        );
      };
    }
  }, [flickingRef.current, index]);

  useEffect(() => {
    const blockEvent = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    if (flickingRef.current && !gesture) {
      const cameraElement = (flickingRef.current as any).cameraElement as any;

      cameraElement.ontouchmove = blockEvent;
      cameraElement.onmousemove = blockEvent;
    }
  }, [flickingRef.current, gesture]);

  return (
    <Self id={id} className={cx('carousel-container', className)}>
      <Flicking
        ref={flickingRef as any}
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
