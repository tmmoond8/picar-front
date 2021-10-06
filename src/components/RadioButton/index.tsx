import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles';

interface RadioProps {
  options: string[];
  defaultValue: string;
  setValue: (v: string) => void;
}

export default function RadioButton({
  options,
  defaultValue,
  setValue,
}: RadioProps) {
  const random = React.useRef(Date.now().toString(32));
  const [selected, setSelected] = React.useState(defaultValue);
  React.useEffect(() => {
    setValue(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <RadioButtonWrapper>
      <Options>
        {options.map((option, index) => (
          <Option>
            <input
              type="radio"
              id={`${random.current}${index}`}
              name={option}
              value={option}
              checked={selected === option}
              onClick={() => setSelected(option)}
            />
            <label htmlFor={`${random.current}${index}`}>{option}</label>
          </Option>
        ))}
      </Options>
    </RadioButtonWrapper>
  );
}

const RadioButtonWrapper = styled.div`
  padding: 0 0 ㅕㅏpx 0;
`;

const Options = styled.ol`
  font-size: 16px;
  padding: 0 18px 24px 18px;
`;

const Option = styled.li`
  margin: 16px 0 0 0;

  input[type='radio']:after {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    top: -2px;
    left: -1px;
    position: relative;
    content: '';
    display: inline-block;
    background-color: ${colors.white};
    border: 1px solid ${colors.black};
    cursor: pointer;
  }

  input[type='radio']:checked:after {
    background-color: ${colors.primary};
    border: 1px solid ${colors.primary};
  }

  label {
    padding: 0 0 0 4px;
    cursor: pointer;
  }
`;
