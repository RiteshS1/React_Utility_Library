import { Amplify } from 'aws-amplify';

// Configure Amplify with your Cognito User Pool
// These values should match your AWS Cognito setup
export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
        userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
        loginWith: {
          email: true,
        },
      }
    }
  });
};
