import * as React from 'react';
import axios from 'axios';
import { useRutterLink } from 'react-rutter-link';

const App = () => {
  const exchangeCredentials = async (publicToken: string) => {
    try {
      const res = await axios.post(
        `https://sandbox.rutterapi.com/item/public_token/exchange`,
        {
          client_id: process.env.CLIENT_ID,
          secret: process.env.SECRET_KEY,
          public_token: publicToken,
        }
      );
      console.log('res.data', res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  const { open } = useRutterLink({
    publicKey: process.env.PUBLIC_KEY || '',
    onSuccess: (publicToken: string) => {
      console.log('publicToken', publicToken);
      exchangeCredentials(publicToken);
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <button onClick={() => open()}>Open</button>
    </div>
  );
};

export default App;
