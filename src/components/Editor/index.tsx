import styled from '@emotion/styled';

import { colors } from '../../styles';

const SendButton = styled.button`
  position: fixed;
  right: 18px;
  top: 18px;
  font-size: 16px;
`;

const Page = styled.section`
  padding: 24px 18px 34px;
`;

const Title = styled.textarea`
  width: 100%;
  height: auto;
  max-height: 72px;
  margin-top: 30px;
  overflow: hidden;

  outline: none;
  border: none;
  color: ${colors.black100};
  font-size: 17px;
  line-height: 24px;
  resize: none;
`;

const Content = styled.textarea`
  position: relative;
  flex: 1;
  width: 100%;
  height: 312px;
  margin-top: 21px;

  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  resize: none;
  &::placeholder {
    color: ${colors.black99};
  }
  outline: none;
  border: none;
`;

const Tools = styled.div`
  display: flex;
  padding: 14px 0;
  button {
    border: none;
    padding: 0;
  }
`;

export default {
  SendButton,
  Page,
  Title,
  Content,
  Tools,
};
