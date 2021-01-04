/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../../styles';

import Icon from '../Icon';

const Recommandations: React.FC<{ 
  recommandations: string[];
}> = ({ recommandations }) => {
  
  return (
    <Wrapper>
      <RecommandationCards>
        {recommandations.map((recommandation, idx) => (
          <RecommandationCard key={recommandation + idx}>
            <Icon icon="time" size="20px"/>
            {recommandation}
          </RecommandationCard>
        ))}
      </RecommandationCards>
    </Wrapper>
  )
}

export default Recommandations;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 0 18px;
`;

const RecommandationCards = styled.ul`
  width: 100%;
  margin: 16px 0 0 0;
`;

const RecommandationCard = styled.li`
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

  .icon {
    margin: 0 6px 0 0;
  }
`;