/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import Page from './BasePage';
import { colors } from '../styles';
import { Profile } from '../types/User';
import Input from '../components/Input';
import Button from '../components/Button';
import Content from '../components/Content';
import Icon from '../components/Icon';
import UserList from '../components/Search/UserList'
import API from '../apis';
import { useStore, observer } from '../stores';
import { toast } from 'react-toastify';

const OwwnerPage = () => {
  const { user } = useStore();
  const [email, onChangeEmail] = Input.useTextField('');
  const [password, onChangePassword] = Input.useTextField('');
  const [admins, setAdmins] = React.useState<Profile[]>([]);

  const handleSubmit = React.useCallback(async ({ email, password }) => {
    const { data } = await API.auth.owwnerLogin({ email, password });
    if (data.ok) {
      toast(`${email} 계정으로 로그인 되었습니다.`);
      window.location.href = '/';
    }
  }, [])

  const isAdmin = user.profile.email.includes('@owwners.com');

  React.useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await API.auth.getAdmins();
      if (data.ok) {
        setAdmins(data.admins);
      }
    }
    if (isAdmin) {
      fetchAdmins();
    }
  }, [isAdmin]);

  return (
    <StyledPage>
      {admins.length > 0 && (
        <Wrapper>
          <UserList
            users={admins}
            renderRight={(email: string) => (<Icon icon="send" color={colors.primary} size="20px" onClick={() => handleSubmit({ email })} />)}
          />
        </Wrapper>
      )}
      {admins.length === 0 && (
        <Form onSubmit={e => e.preventDefault()}>
          <Input.TextField id="email" label="이메일" value={email} onChange={onChangeEmail} />
          <Input.TextField id="password" type="password" label="인증키" value={password} onChange={onChangePassword} />
          <Content.Spacing size={32} />
          <Button.Full onClick={() => handleSubmit({ email, password })}>로그인</Button.Full>
        </Form>
      )}
    </StyledPage>
  );
}

export default observer(OwwnerPage);

const StyledPage = styled(Page)`
      display: flex;
      flex-direction: column;
      `;

const Form = styled.form`
      height: 100%;
      padding: 20px;
      background-color: ${colors.white};
      `;

const Wrapper = styled.div`
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      `;