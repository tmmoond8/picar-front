import styled from '@emotion/styled';

import Image from './Image';
import Input from '../Input';
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

const Title = styled(Input.TextArea)`
  height: auto;
  min-height: 22px;
  max-height: 60px;

  .Input {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.58;
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

const Selector = styled.button`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 2;
  color: ${colors.black77};
  background-color: ${colors.blackF5F6F7};
  border-radius: 8px;
  padding: 0 10px;
  cursor: pointer;

  .Icon.arrowDown {
    margin: 0 0 0 6px;
  }
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
  Tools,
  UploadButton,
  Image,
  Form,
  Selector,
};
