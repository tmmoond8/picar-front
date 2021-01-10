/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

import Icon from '../Icon';

const Recommendations: React.FC<{ 
  recommendations: { keywords: string }[];
  handleClickRecommendation: (keyword: string) => void;
}> = ({ recommendations, handleClickRecommendation }) => {
  
  return (
    <Wrapper>
      <RecommendationCards>
        {recommendations.map(({ keywords }, idx) => (
          <RecommendationCard key={keywords + idx} onClick={() => handleClickRecommendation(keywords)}>
            <Icon icon="trending" size="20px"/>
            {keywords}
          </RecommendationCard>
        ))}
      </RecommendationCards>
    </Wrapper>
  )
}

export default Recommendations;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 0 18px;
`;

const RecommendationCards = styled.ul`
  width: 100%;
  margin: 16px 0 0 0;
`;

const RecommendationCard = styled.li`
  display: inline-flex;
  align-items: center;
  height: 42px;
  margin: 0 8px 8px 0;
  padding: 0 12px;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: ${colors.black33};
  border-radius: 4px;
  border: 1px solid ${colors.blackEB};
  cursor: pointer;

  .icon {
    margin: 0 6px 0 0;
    cursor: pointer;
  }
`;