declare module 'react-naver-login' {
  import * as React from 'react';

  export interface ReactNaverLoginProps {
    clientId: string;
    callbackUrl: string;
    render: (props: any) => React.ReactNode;
    onSuccess: (result: any) => void;
    onFailure: (error: unknown) => void;
  }
  
  const ReactNaverLogin: React.FC<ReactNaverLoginProps>
  
  export default ReactNaverLogin

}