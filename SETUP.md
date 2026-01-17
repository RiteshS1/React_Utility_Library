# Quick Setup Guide - AWS Cognito Authentication

This guide will help you get the React Mastery Learning Platform running with AWS Cognito authentication in just a few steps.

## Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **AWS Account** - [Sign up here](https://aws.amazon.com/) (free tier available)

## Part 1: AWS Cognito Setup (One-Time, ~10 minutes)

### Step 1: Create Cognito User Pool

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Click **"Create user pool"**
3. **Configure sign-in experience:**
   - Provider types: **Cognito user pool**
   - Cognito user pool sign-in options: Check **Email**
   - Click **Next**

4. **Configure security requirements:**
   - Password policy: **Cognito defaults** (or customize)
   - Multi-factor authentication: **No MFA** (for development)
   - Click **Next**

5. **Configure sign-up experience:**
   - Self-registration: **Enable self-registration**
   - Attribute verification: **Send email message, verify email address**
   - Required attributes: **email** (pre-selected)
   - Click **Next**

6. **Configure message delivery:**
   - Email provider: **Send email with Cognito** (free, 50 emails/day)
   - Click **Next**

7. **Integrate your app:**
   - User pool name: **react-mastery-pool** (or your preferred name)
   - App client name: **react-mastery-client**
   - **IMPORTANT**: DO NOT select "Generate a client secret"
   - Click **Next**

8. **Review and create:**
   - Review all settings
   - Click **Create user pool**

### Step 2: Get Your Configuration Values

After creating the user pool:

1. **User Pool ID**: 
   - On the User Pool page, look for "User pool ID"
   - Copy this value (e.g., `us-east-1_AbCdEfGhI`)

2. **App Client ID**:
   - Go to "App integration" tab
   - Under "App clients and analytics", click on your app client
   - Copy the "Client ID" (e.g., `1a2b3c4d5e6f7g8h9i0j`)

3. **AWS Region**:
   - Note your region from the User Pool ID (e.g., `us-east-1`)

### Step 3: Configure Authentication Flows (Important!)

1. In your User Pool, go to "App integration" tab
2. Click on your app client name
3. Scroll to "Authentication flows"
4. **Enable these flows:**
   - ✅ ALLOW_USER_PASSWORD_AUTH
   - ✅ ALLOW_REFRESH_TOKEN_AUTH
   - ✅ ALLOW_USER_SRP_AUTH (enabled by default)
5. Click **Save changes**

## Part 2: Application Setup

### Step 1: Clone and Install

```bash
# Clone repository
git clone https://github.com/RiteshS1/React_Utility_Library.git
cd React_Utility_Library

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Frontend

```bash
# Create frontend environment file
cp .env.example .env
```

Edit `.env` with your Cognito values:
```env
VITE_COGNITO_USER_POOL_ID=us-east-1_AbCdEfGhI
VITE_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
VITE_AWS_REGION=us-east-1
VITE_API_URL=http://localhost:3001
```

### Step 3: Configure Backend

```bash
# Create backend environment file
cd server
cp .env.example .env
```

Edit `server/.env` with your Cognito values:
```env
PORT=3001
NODE_ENV=development
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_AbCdEfGhI
COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
CLIENT_URL=http://localhost:5173
```

### Step 4: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

You should see:
```
Server running on port 3001
Client URL: http://localhost:5173
Authentication: AWS Cognito
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

You should see:
```
VITE v7.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 5: Open and Test

1. Navigate to: **http://localhost:5173**
2. Click **"Register"** in the sidebar
3. Create a test account with:
   - Username: `testuser`
   - Email: Your email (you'll receive a verification code)
   - Password: At least 8 characters with uppercase, lowercase, and numbers
4. Check your email for the verification code (if email verification is enabled)
5. Try logging in

## Testing the Features

### Test Authentication

1. **Register a new account**
   - Click "Register" in sidebar
   - Fill in the form
   - Submit and check your email for verification (if enabled)

2. **Login**
   - Click "Login" in sidebar
   - Enter your credentials
   - You'll be automatically logged in

3. **Check session**
   - Close the browser tab
   - Reopen http://localhost:5173
   - You should still be logged in (Amplify handles this)

4. **Logout**
   - Click your username in sidebar
   - Click "Logout"

### Test Real-Time User Tracking

1. Open the application in multiple browser windows/tabs
2. Watch the "users online" counter in sidebar and footer
3. It should increase with each new window/tab
4. Close a window/tab and watch the counter decrease

## What You Should See

### Sidebar Features
- Navigation menu with all React learning topics
- **Online users counter** showing real-time count
- **Account section** with:
  - Login/Register buttons (when not logged in)
  - Username and Logout button (when logged in)

### Footer
- Creator information
- Social links
- **Online users counter**

## Troubleshooting

### "User is not confirmed" Error

**Option 1: Disable Email Verification (Development Only)**
1. Go to Cognito User Pool
2. Sign-up experience → Edit
3. Attribute verification → Set to "No verification"
4. Save changes
5. Try registering again

**Option 2: Manually Confirm User**
1. Go to Cognito User Pool → Users
2. Find your user
3. Actions → Confirm account

### "Invalid authentication" Errors

Check these common issues:
- ✅ User Pool ID matches in both `.env` files
- ✅ Client ID matches in both `.env` files  
- ✅ AWS Region is correct
- ✅ No extra spaces in `.env` values
- ✅ Authentication flows are enabled in Cognito

### Backend Won't Start

- Ensure all environment variables are set
- Check that port 3001 is not in use: `lsof -i :3001`
- Verify `aws-jwt-verify` is installed: `cd server && npm list aws-jwt-verify`

### Frontend Login Not Working

- Open browser DevTools → Console
- Look for Amplify configuration errors
- Verify Cognito configuration in `.env`
- Check that backend is running

### Email Not Received

- Check spam/junk folder
- Verify email in Cognito is correct
- Free tier has 50 emails/day limit
- Consider disabling email verification for development

## Next Steps

### Customize Cognito Settings

1. **Password Policy**: Cognito → Security → Password requirements
2. **MFA**: Cognito → Security → Multi-factor authentication
3. **Email Templates**: Cognito → Messaging → Email templates
4. **Custom Domain**: Cognito → App integration → Domain

### Add More Features

- Social sign-in (Google, Facebook, etc.)
- Custom attributes (profile picture, bio, etc.)
- Email templates customization
- Advanced security rules

### Deploy to Production

See the main [README.md](README.md) for deployment instructions.

## Quick Reference

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
```bash
npm run dev
```

### Check Logs
- Backend: Terminal output
- Frontend: Browser DevTools → Console
- Cognito: AWS Console → CloudWatch Logs

### Useful Cognito CLI Commands
```bash
# List users in pool
aws cognito-idp list-users --user-pool-id us-east-1_AbCdEfGhI

# Confirm a user manually
aws cognito-idp admin-confirm-sign-up \
  --user-pool-id us-east-1_AbCdEfGhI \
  --username user@example.com
```

## Support

- **AWS Cognito Docs**: https://docs.aws.amazon.com/cognito/
- **AWS Amplify Docs**: https://docs.amplify.aws/
- **Project README**: [README.md](README.md)
- **GitHub Issues**: https://github.com/RiteshS1/React_Utility_Library/issues

## Cost Information

**AWS Cognito Free Tier:**
- 50,000 Monthly Active Users (MAUs) - FREE
- After that: $0.0055 per MAU

**For this project in development:**
- Cost: $0 (well within free tier)

Happy learning! 🚀
