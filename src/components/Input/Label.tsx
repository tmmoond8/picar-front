/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../../styles';

interface LabelProps {
  label: string;
  subLabel?: string;
}

export default function Label(props: LabelProps): JSX.Element {
  const { label, subLabel } = props;
  return (
    <StyledLabel>
      <h3>{label}</h3>
      {subLabel && (
        <p>
          {subLabel.split('\n').map((line) => (
            <span>
              {line}
              <br />
            </span>
          ))}
        </p>
      )}
    </StyledLabel>
  );
}

const StyledLabel = styled.div`
  margin: 3px 0 16px 0;

  h3 {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.25px;
    color: ${colors.black22};
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.3px;
    color: ${colors.blackBF};
  }
`;
