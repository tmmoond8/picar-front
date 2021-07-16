import React from 'react';
import styled from '@emotion/styled';
import { constants, colors } from '../../styles';
import Icon from '../Icon';
import Image from '../Image';

const Shadower = styled.div`
  position: fixed;
  top: ${constants.safeTop};
  bottom: ${constants.safeTop};
  left: 0;
  right: 0;
  margin: auto;
  background-color: ${colors.dimmed};
  z-index: 10000;
`;

const Box = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: calc(100% - 32px);
  max-width: 420px;
  height: fit-content;
  margin: auto;
  border-radius: 16px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 16px;
  object-fit: unset;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  
  .NoShow {
    color: ${colors.blackEB};
    font-size: 18px;  
    font-weight: 500;
    letter-spacing: -0.15px;
    text-decoration: underline;
    cursor: pointer;
  }
  .CloseButton {
    display: flex;
    align-items: center;
    color: ${colors.blackEB};
    font-size: 18px;  
    font-weight: 500;
    letter-spacing: -0.15px;
    cursor: pointer;

    span {
      margin-right: 2px;
    }
  }
`;


const thumbnail = 'https://static.owwners.com/dhfi7dxpu/image/upload/c_thumb,w_200,g_face/v1617705694/owner/contents_3x_tdbye5.png';
const src = 'https://static.picar.kr/dhfi7dxpu/image/upload/v1626445430/picar/contents_j2xorw.png';
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.tmmoond8.picar';

const AndroidDownloadPopup: React.FC<{
  onClose: () => void;
  onClickNoShow: () => void;
}> = ({ onClose, onClickNoShow }) => {
  return (
    <Shadower>
      <Box>
        <a href={playStoreUrl} target="_blank"><StyledImage src={src} placeholder={thumbnail} /></a>
        <ActionButtons>
          <button className="NoShow" onClick={onClickNoShow}>3일간 보지 않기</button>
          <button className="CloseButton" onClick={onClose}>
            <span>닫기</span>
            <Icon icon="close" size="24px" />
          </button>
        </ActionButtons>
      </Box>
    </Shadower>
  )
}

export default AndroidDownloadPopup;