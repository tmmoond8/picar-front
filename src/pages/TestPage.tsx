/** @jsx jsx */
import { jsx } from '@emotion/core';
import Profile from '../components/Profile';

export default (function TestPage(): JSX.Element {
  return <Profile.Form handleClose={() => console.log('')} />;
});
