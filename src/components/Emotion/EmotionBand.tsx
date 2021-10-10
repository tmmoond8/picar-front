/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import { EmotionCount } from '../../types/Emotion';
import Icon, { IconKey } from '../Icon';

const HEIGHT_MAP = ['13px', '-33px', '-80px', '-125px'];

const EmotionBand: React.FC<{ emotionCounts: EmotionCount[] }> = ({
  emotionCounts,
}) => {
  const [isFold, setIsFold] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  const [rollingHeight, setRollingHeight] = React.useState(HEIGHT_MAP[0]);
  const handleToggleFold = React.useCallback(() => {
    const EmotionBandElement = ref.current!;
    if (isFold) {
      EmotionBandElement.style.width = '100%';
      setIsFold(!isFold);
    } else {
      EmotionBandElement.style.width = '170px';
      setTimeout(() => {
        EmotionBandElement.style.width = '108px';
        setIsFold(!isFold);
      }, 200);
    }
  }, [isFold, ref]);
  const toggleWrapper = React.useCallback(() => {
    if (isFold) {
      handleToggleFold();
    }
  }, [handleToggleFold, isFold]);
  React.useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setRollingHeight(HEIGHT_MAP[count % 4]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isFold]);
  return (
    <Band
      ref={ref}
      isFold={isFold}
      rollingHeight={rollingHeight}
      onClick={toggleWrapper}
    >
      <FoldingButton
        icon={isFold ? 'leftTriangle' : 'close'}
        size="16px"
        color={colors.blackBF}
        onClick={handleToggleFold}
      />
      <Emotions className="Emotions">
        {emotionCounts.map((emotionCount) => (
          <Emotion key={emotionCount.type}>
            <Icon icon={emotionCount.icon as IconKey} size="24px" />
            <span>{emotionCount.count}</span>
          </Emotion>
        ))}
      </Emotions>
    </Band>
  );
};

export default React.memo(EmotionBand);

const Band = styled.div<{ isFold: boolean; rollingHeight: string }>`
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  transition: width 0.5s ease-out;
  overflow: hidden;

  ${(p) =>
    p.isFold &&
    css`
      width: 108px;

      .Emotions {
        flex-direction: column;
        position: absolute;
        right: 0;
        width: 78px;
        height: 160px;
        justify-content: space-between;
        cursor: pointer;

        transition: all 0.5s ease-out;
        transform: translateY(${p.rollingHeight});
        li {
          margin-left: 0;
          align-items: center;
        }
        svg {
          cursor: pointer;
        }
      }
    `}
`;

const Emotions = styled.ol`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Emotion = styled.li`
  display: flex;
  align-items: center;

  & + & {
    margin-left: 20px;
  }
  span {
    font-size: 15px;
    color: ${colors.black66};
    margin-left: 5px;
  }
`;

const FoldingButton = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  padding: 10px;
  box-sizing: content-box;
  z-index: 10;
`;
