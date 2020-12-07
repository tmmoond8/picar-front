/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { useSignUpContext, observer } from './context';
import BottomCTA from './BottomCTA';
import Content from '../Content';
import Input from '../Input';
import LoungeGrid from '../LoungeGrid';
import { colors } from '../../styles';

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  h2 {
    color: ${colors.black};
    font-weight: 500;
    font-size: 19px;
    letter-spacing: -0.5px;
  }
  p {
    color: ${colors.blackCC};
    font-size: 14px;
    line-height: 1.43;
  }
`;

function LoungeForm(): JSX.Element {
  const { lounge, setLounge } = useSignUpContext();

  return (
    <Form>
      <Input.Label
        label="종사업종을 알려주세요"
        subLabel={
          '업종선택시 대표라운지로 설정됩니다.\n 예비오너님들은 대표 관심업종을 선택해주세요'
        }
      />
      <Content.Spacing size={30} />
      <LoungeGrid
        selectedLounge={lounge}
        onClick={(lounge: string) => {
          setLounge(lounge);
        }}
      />
    </Form>
  );
}

LoungeForm.BottomCTA = observer((props: { onClick: () => void }) => {
  const { onClick } = props;
  const { lounge } = useSignUpContext();
  const disabled = React.useMemo(() => lounge === '', [lounge]);
  return (
    <BottomCTA onClick={onClick} disabled={disabled}>
      가입하기
    </BottomCTA>
  );
});

export default observer(LoungeForm);
