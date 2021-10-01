/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useStore, observer } from '../../stores';
import { colors } from '../../styles';
import { SkeletonTheme } from 'react-loading-skeleton';
import DesktopFallback from './DesktopFallback';
import MobileFallback from './MobileFallback';

export default observer(function SuspenseFallback() {
  const { ui } = useStore();
  return (
    <Wrapper>
      <SkeletonTheme color={colors.primaryE} highlightColor={colors.white}>
        {!ui.queryMatch.Mobile && <DesktopFallback />}
        {ui.queryMatch.Mobile && <MobileFallback />}
      </SkeletonTheme>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;
