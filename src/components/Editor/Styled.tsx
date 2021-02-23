import styled from '@emotion/styled';

import Image from './Image';

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

export default {
  Page,
  Image,
  Form,
};
