import * as React from 'react';
import axios from 'axios';
import { useRutterLink } from 'react-rutter-link';

interface Credentials {
  access_token: string;
  connection_id: string;
  is_ready: boolean;
  platform: string;
  request_id: string;
}

const App = () => {
  const [credentials, setCredentials] = React.useState<Credentials>();

  const exchangeCredentials = async (publicToken: string) => {
    try {
      const res = await axios.post<Credentials>(
        `https://sandbox.rutterapi.com/item/public_token/exchange`,
        {
          client_id: process.env.REACT_APP_CLIENT_ID,
          secret: process.env.REACT_APP_SECRET_KEY,
          public_token: publicToken,
        }
      );
      setCredentials(res.data);
      console.log('exchangeCredentials res.data', res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  const [connection, setConnection] = React.useState<any>();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(
        'https://sandbox.rutterapi.com/connections/access_token',
        {
          params: {
            access_token: credentials!.access_token,
          },
          auth: {
            username: process.env.REACT_APP_CLIENT_ID || '',
            password: process.env.REACT_APP_SECRET_KEY || '',
          },
        }
      );

      console.log('fetchConnection res.data', res);
      setConnection(res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  const { open } = useRutterLink({
    publicKey: process.env.REACT_APP_PUBLIC_KEY || '',
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
      {connection ? (
        <pre>{connection}</pre>
      ) : credentials ? (
        <button onClick={() => fetchConnection()}>Fetch Connection</button>
      ) : (
        <button onClick={() => open()}>Open Rutter Link</button>
      )}
    </div>
  );
};

export default App;
