/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import LoungeForm from '../components/SignUp/LoungeForm';

export default (function TestPage(): JSX.Element {
  const [vendor, setVendor] = React.useState('');
  const handleNext = () => console.log('next');
  return <LoungeForm.VendorForm setVendor={setVendor} vendor={vendor} handleNext={handleNext} />;
});
