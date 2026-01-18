import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Create verifier for Cognito access tokens
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID || '',
  tokenUse: 'access',
  clientId: process.env.COGNITO_CLIENT_ID || '',
});

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the Cognito JWT token
    const payload = await verifier.verify(token);
    req.user = {
      userId: payload.sub,
      username: payload.username,
      email: payload.email,
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
