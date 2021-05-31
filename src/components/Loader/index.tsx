/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useRef, useLayoutEffect, useEffect, useState, RefObject } from 'react';
import cx from 'classnames';
import { debounce } from 'throttle-debounce';
import { colors } from '../../styles';
import Icon from '../Icon';

interface WrapperSize {
  left: number;
  top: number;
  height: number;
  width: number;
}
const Loader: React.FC<{ className?: string; size?: string; }> = ({ className, size = "16px" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { top, left, width, height } = useParentSize(ref);

  return (
    <ParentFullWrapper
      className={cx('Loader', className)}
      ref={ref}
      top={top}
      left={left}
      height={height}
      width={width}
    >
      <Icon icon="loading" size={size} />
    </ParentFullWrapper>
  );
}

export default Loader;

const ParentFullWrapper = styled.div<WrapperSize>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: ${p => p.top}px;
  left: ${p => p.left}px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  & > svg {
    @keyframes rotate {
      100% {
        transform: rotate(1turn);
      }
    }
    animation: rotate 1s linear infinite;
  }
`;

function useParentSize(ref: RefObject<HTMLDivElement>): WrapperSize {
  const [wrapperSize, setWrapperSize] = useState({
    top: 0,
    left: -9999,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { width = 0, height = 0, left = -9999, top = 0 } =
      ref.current?.parentElement?.getBoundingClientRect() ?? {};
    setWrapperSize({
      top,
      left,
      width,
      height,
    });
  }, [ref]);

  useLayoutEffect(() => {
    const resizeEvent = debounce(300, () => {
      if (ref.current) {
        const { width = 0, height = 0, left = -9999, top = 0 } =
          ref.current?.parentElement?.getBoundingClientRect() ?? {};
        setWrapperSize({
          top,
          left,
          width,
          height,
        });
      }
    });

    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, [ref]);

  return {
    top: wrapperSize.top,
    left: wrapperSize.left,
    width: wrapperSize.width,
    height: wrapperSize.height,
  };
};
