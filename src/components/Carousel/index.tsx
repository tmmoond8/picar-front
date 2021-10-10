/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import cx from 'classnames';
import CarouselHeader, { CarouselHeaderProps } from './CarouselHeader';
import { FlickingEvent } from '@egjs/flicking';
import Flicking from '@egjs/react-flicking';
import global from '../../types/global';
import { CAROUSEL } from '../../types/constants';
import { observer, useStore } from '../../stores';
interface CraouselProps {
  id: typeof CAROUSEL[keyof typeof CAROUSEL];
  className?: string;
  index: number;
  children: React.ReactNode;
  gesture?: boolean;
  onChangeIndex: (i: number) => void;
}

type CarouselComponent = React.FC<CraouselProps> & {
  Header: React.FC<CarouselHeaderProps>;
};

const Carousel: CarouselComponent = ({
  id,
  className,
  index,
  children,
  onChangeIndex,
  gesture = true,
}) => {
  const flickingRef = React.useRef<HTMLElement>(null);
  const { ui } = useStore();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (flickingRef?.current) {
      global.__OWNER__[id as typeof CAROUSEL[keyof typeof CAROUSEL]] = (
        _index: number,
      ) => {
        (flickingRef.current as any).forced = true;
        (flickingRef.current as any).moveTo(
          _index,
          Math.abs(index - _index) > 1 ? 0 : 500,
        );
        timer = setTimeout(() => {
          (flickingRef.current as any).forced = false;
        }, 500);
      };
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flickingRef.current, index]);

  const customEvent = (e: FlickingEvent) => {
    if (!gesture && !(flickingRef.current as any).forced) {
      e.stop();
    }
  };

  return (
    <Self id={id} className={cx('carousel-container', className)}>
      <Flicking
        ref={flickingRef as any}
        tag="div"
        viewportTag="div"
        cameraTag="div"
        onChange={(e) => {
          onChangeIndex(e.index);
        }}
        onMoveStart={customEvent as any}
        onMove={customEvent as any}
        onMoveEnd={customEvent as any}
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
        autoResize={ui.queryMatch.Desktop}
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
};

Carousel.Header = CarouselHeader;
export default observer(Carousel);

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
