import { CognitoJwtVerifier } from 'aws-jwt-verify';

let verifier = null;

const getVerifier = () => {
  if (!verifier) {
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    const clientId = process.env.COGNITO_CLIENT_ID;
    
    if (!userPoolId || !clientId) {
      throw new Error(
        'Missing Cognito configuration. ' +
        'Check COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID in server/.env file'
      );
    }
    
    verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: 'id',
      clientId,
    });
  }
  return verifier;
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const jwtVerifier = getVerifier();
    const payload = await jwtVerifier.verify(token);
    req.user = {
      userId: payload.sub,
      username: payload.preferred_username || payload['cognito:username'] || payload.email?.split('@')[0] || 'user',
      email: payload.email,
    };
    next();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Token verification error:', error.message);
    }
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
