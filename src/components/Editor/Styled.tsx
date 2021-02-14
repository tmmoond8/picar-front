import styled from '@emotion/styled';

import Image from './Image';
import Button from '../Button';
import { colors } from '../../styles';

const SendButton = styled.button`
  position: fixed;
  right: 18px;
  top: 18px;
  font-size: 16px;
  color: ${colors.primary};
  cursor: pointer;
`;

const Form = styled.section`
  width: 100%;
  height: 100%;
  padding: 24px 18px 34px;
  box-sizing: border-box;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  #editorFlickingMoveTo {
    flex: 1;
    .eg-flick-camera > .Form,
    .eg-flick-camera > .AllLoungeList {
      overflow-y: auto;
    }
  }
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

const Selector = styled.button`
  font-size: 13px;
  font-weight: 500;
  line-height: 2;
  color: ${colors.black77};
  background-color: ${colors.blackF5F6F7};
  border-radius: 8px;
  padding: 0 10px;
  cursor: pointer;
`

const UploadButton = styled(Button)`
  .Icon {
    cursor: pointer;
  }
`;

export default {
  SendButton,
  Page,
  Title,
  Content,
  Tools,
  UploadButton,
  Image,
  Form,
  Selector,
};
