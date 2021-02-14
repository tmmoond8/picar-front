/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from '../styles';
import { useRouteMatch } from 'react-router';
import React from 'react';
import APIS from '../apis';
import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import BackHeader from '../components/Header/BackHeader';
import Loader from '../components/Loader';
import Page from './BasePage';
import { useStore, observer } from '../stores';


const NotionEmbedPage: React.FC<{ pageId?: string; title?: string }> = ({ pageId, title }) => {
  const { ui } = useStore();
  const { params } = useRouteMatch<{id: string | undefined}>();
  const [notice, setNotice] = React.useState<any>(null);
  const HeaderOption = { title }
  const id = params.id ?? pageId ?? '7c13bd34a78d4c41b5b1956e19e272b4';
  React.useEffect(() => {
    (async () => {
      const { data } = await APIS.notion.getPage(id);
      setNotice(data);
    })();
  }, [id])

  return (
    <StyledPage>
      {ui.queryMatch.Mobile && <BackHeader options={HeaderOption} />}
      <NotionContents>
        {!notice && <Loader size="24px"/>}
        {notice && (
          <NotionRenderer mapPageUrl={url => `/notion/${url}`} blockMap={notice}/>
        )}
      </NotionContents>
    </StyledPage>
  );
};

export default observer(NotionEmbedPage);

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: column;
`;

const NotionContents = styled.div`
  height: 100%;
  padding: 16px 18px;
  background-color: ${colors.white};
  overflow-y: auto;
`;