import styled from '@emotion/styled';

import Image from './Image';
import Button from '../Button';

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
  Page,
  Tools,
  UploadButton,
  Image,
  Form,
};
