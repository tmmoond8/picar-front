/** @jsx jsx */
import { jsx } from '@emotion/core';
import SignUp from '../components/SignUp';

export default (function TestPage(): JSX.Element {
  return (
    <SignUp
      provider="kakao"
      snsId="1231321321"
      onClose={() => console.log('close')}
      onSetUserProfile={() => console.log('abc')}
    />
  );
});
