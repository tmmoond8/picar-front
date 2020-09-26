/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

interface ProfilePhotoProps {
  src?: string;
}

const defaultImage =
  'https://res.cloudinary.com/dgggcrkxq/image/upload/v1600597433/noticon/ayvhqsqwqbfr0dauelcv.png';

export default function ProfilePhoto(props: ProfilePhotoProps): JSX.Element {
  const { src } = props;
  console.log(src);
  return <Self src={src || defaultImage} />;
}

const Self = styled.div<{ src: string }>`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: url(${(p) => p.src});
  background-size: contain;
`;
