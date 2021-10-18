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
  const [rollingHeight, setRollingHeight] = React.useState(HEIGHT_MAP[0]);

  React.useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setRollingHeight(HEIGHT_MAP[count % 4]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <EmotionBandWrapper>
      <Rolling>
        <FoldUnFoldButton
          icon="leftTriangle"
          size="16px"
          color={colors.blackBF}
          onClick={() => setIsFold(false)}
        />
        <OptimizedRolingEmotions
          rollingHeight={rollingHeight}
          emotionCounts={emotionCounts}
        />
      </Rolling>
      <Band isFold={isFold}>
        <FoldUnFoldButton
          icon="close"
          size="16px"
          color={colors.blackBF}
          onClick={() => setIsFold(true)}
        />
        <BandEmotions>
          {emotionCounts.map((emotionCount) => (
            <Emotion key={emotionCount.type}>
              <Icon icon={emotionCount.icon as IconKey} size="24px" />
              <span>{emotionCount.count}</span>
            </Emotion>
          ))}
        </BandEmotions>
      </Band>
    </EmotionBandWrapper>
  );
};

export default React.memo(EmotionBand);

const OptimizedRolingEmotions = React.memo(function ({
  rollingHeight,
  emotionCounts,
}: {
  emotionCounts: EmotionCount[];
  rollingHeight: string;
}) {
  return (
    <RollingEmotions className="Emotions" rollingHeight={rollingHeight}>
      {emotionCounts.map((emotionCount) => (
        <Emotion key={emotionCount.type}>
          <Icon icon={emotionCount.icon as IconKey} size="24px" />
          <span>{emotionCount.count}</span>
        </Emotion>
      ))}
    </RollingEmotions>
  );
});

const EmotionBandWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Rolling = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  width: 108px;
  overflow: hidden;
`;

const RollingEmotions = styled.ol<{
  rollingHeight: string;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  flex-direction: column;

  right: 0;
  width: 78px;
  height: 160px;
  cursor: pointer;

  transition: transform 0.5s ease-in;
  transform: translate3d(0, ${(p) => p.rollingHeight}, 0);

  svg {
    cursor: pointer;
  }
`;

const Emotion = styled.li`
  display: flex;
  align-items: center;
  margin-left: 20px;

  span {
    font-size: 15px;
    color: ${colors.black66};
    margin-left: 5px;
  }
`;

const FoldUnFoldButton = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  padding: 10px;
  box-sizing: content-box;
  z-index: 10;
`;

const Band = styled.div<{ isFold: boolean }>`
  position: absolute;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  z-index: 20;

  ${(p) =>
    p.isFold &&
    css`
      transform: translate3d(100%, 0, 0);
    `}
`;

const BandEmotions = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
