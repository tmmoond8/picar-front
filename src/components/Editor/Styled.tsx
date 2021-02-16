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

const Title = styled.div<{ placeholder?: string }>`
  position: relative;
  flex: 1;
  height: auto;
  min-height: 22px;
  max-height: 60px;
  margin: 24px 0 0 0;
  order: 1;
  font-size: 19px;
  font-weight: 500;
  line-height: 1.58;
  overflow-y: auto;

  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;

  &:after {
    content: ${(p) => (p.placeholder ? `'${p.placeholder}'` : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.black99};
    pointer-events: none;
  }

  &:focus {
    &:after {
      content: none;
    }
  }
`;

const Content = styled.div<{ placeholder?: string }>`
  position: relative;
  flex: 1;
  height: auto;
  min-height: 260px;
  margin: 24px 0;
  order: 1;
  color: ${colors.black33};
  font-size: 15px;
  font-weight: 400;
  line-height: 26px;
  overflow-y: auto;

  outline: none;
  border: none;
  transition: all 0.3s ease-in-out;

  &:after {
    content: ${(p) => (p.placeholder ? `'${p.placeholder}'` : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    color: ${colors.black99};
    pointer-events: none;
  }

  &:focus {
    &:after {
      content: none;
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
  Content,
  Tools,
  UploadButton,
  Image,
  Form,
  Selector,
};
