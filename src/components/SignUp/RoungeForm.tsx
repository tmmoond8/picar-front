/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import { useSignUpContext, observer } from './context';
import Content from '../Content';
import RoungeGrid from '../RoungeGrid';
import { colors } from '../../styles';

const Form = styled.form`
  height: 100vh;
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

export default observer(function RoungeForm(): JSX.Element {
  const {} = useSignUpContext();

  return (
    <Form>
      <Content.Spacing size={8} />
      <h2>종사업종을 알려주세요</h2>
      <Content.Spacing size={12} />
      <p>
        종사업종 선택시 기본 라운지로 설정이 됩니다. 설정은 변경 가능하며 다른
        라운지도 얼마든지 이동 할 수 있어요.
      </p>
      <Content.Spacing size={30} />
      <RoungeGrid
        onClick={(group: string) => {
          console.log(group);
        }}
      />
    </Form>
  );
});
