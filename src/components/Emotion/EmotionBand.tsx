/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
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
  const [rollingHeight, setRollingHeight] = React.useState(HEIGHT_MAP[0]);
  const handleToggleFold = React.useCallback(() => {
    setIsFold(!isFold);
  }, [isFold]);
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
  }, []);
  return (
    <Band isFold={isFold} rollingHeight={rollingHeight} onClick={toggleWrapper}>
      <FoldingButton
        icon={isFold ? 'leftTriangle' : 'close'}
        size="16px"
        color={colors.blackBF}
        onClick={handleToggleFold}
      />
      <Emotions className="Emotions">
        {emotionCounts.map((emotionCount) => (
          <Emotion key={emotionCount.type}>
            <Icon icon={emotionCount.icon as IconKey} size="18px" />
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
  transition: width 0.5s ease-in-out;
  overflow: hidden;

  ${(p) =>
    p.isFold &&
    css`
      width: 108px;
      transition: width 0.15s ease-in-out;

      .Emotions {
        flex-direction: column;
        position: absolute;
        right: 0;
        width: 78px;
        height: 160px;
        justify-content: space-between;
        cursor: pointer;

        transition: all 0.5s ease-in-out;
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
