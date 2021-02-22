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

const Tools = styled.div`
  display: flex;
  padding: 14px 0;
  button {
    border: none;
    padding: 0;
  }
`;

const UploadButton = styled(Button)`
  .Icon {
    cursor: pointer;
  }
`;

export default {
  SendButton,
  Page,
  Tools,
  UploadButton,
  Image,
  Form,
};
