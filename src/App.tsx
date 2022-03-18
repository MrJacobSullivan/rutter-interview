import * as React from 'react';
import { useRutterLink, RutterLinkOptions } from 'react-rutter-link';

const App = () => {
  const rutterConfig: RutterLinkOptions = {
    publicKey: process.env.RUTTER_PUBLIC_KEY || '',
    onSuccess: (publicToken: string) => {
      console.log(publicToken);
    },
  };

  const { open } = useRutterLink(rutterConfig);

  return (
    <div>
      <button onClick={() => open()}>Open</button>
    </div>
  );
};

export default App;
