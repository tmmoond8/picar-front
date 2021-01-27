/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import cx from 'classnames';
import CarouselHeader, { CarouselHeaderProps } from './CarouselHeader';
import Flicking from '@egjs/react-flicking';
import global from '../../types/global';
import { CAROUSEL } from '../../types/constants';

interface CraouselProps {
  id: typeof CAROUSEL[keyof typeof CAROUSEL];
  className?: string;
  index: number;
  children: React.ReactNode;
  gesture?: boolean;
  onChangeIndex: (i: number) => void;
}

type CarouselComponent = React.FC<CraouselProps > & { Header: React.FC<CarouselHeaderProps>};

const Carousel: CarouselComponent = ({
  id,
  className,
  index,
  children,
  onChangeIndex,
  gesture = true,
}) => {
  const flickingRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (flickingRef?.current) {
      global.__OWNER__[id as typeof CAROUSEL[keyof typeof CAROUSEL]] = (
        _index: number,
      ) => {
        (flickingRef.current as any).moveTo(
          _index,
          Math.abs(index - _index) > 1 ? 0 : 500,
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flickingRef.current, gesture]);

  return (
    <Self id={id} className={cx('carousel-container', className)}>
      <Flicking
        ref={flickingRef as any}
        tag="div"
        viewportTag="div"
        cameraTag="div"
        onChange={e => {
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
        autoResize={true}
        adaptive={true}
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
}

Carousel.Header = CarouselHeader;
export default Carousel;

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
