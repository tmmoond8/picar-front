/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { colors } from '../../styles';
import { EmotionCount } from '../../types/Emotion';
import Icon, { IconKey } from '../Icon';

const EmotionBand: React.FC<{ emotionCounts: EmotionCount[] }> = ({
  emotionCounts,
}) => {
  const [isFold, setIsFold] = React.useState(false);
  const handleToggleFold = React.useCallback(() => {
    setIsFold(!isFold);
  }, [isFold]);
  return (
    <Band>
      <CloseButton
        icon="close"
        size="16px"
        color={colors.blackBF}
        onClick={handleToggleFold}
      />
      <Emotions>
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

const Band = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
`;

const Emotions = styled.ol`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Emotion = styled.li`
  display: flex;

  & + & {
    margin-left: 20px;
  }
  span {
    font-size: 15px;
    color: ${colors.black66};
    margin-left: 5px;
  }
`;

const CloseButton = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  padding: 10px;
  box-sizing: content-box;
`;
