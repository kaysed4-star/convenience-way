# Convenience Way Prototype Deployment

This prototype can run as one hosted web app:

- Express serves the API under `/api`
- Express serves the React production build for all normal page routes
- The React app calls `/api` by default, so it does not depend on your local laptop URL

## Recommended Render Setup

Create a new Render **Web Service** from this repository.

Use these settings:

```text
Root Directory: server
Build Command: npm install && npm run build
Start Command: npm start
```

The server `build` script installs and builds the React client from `../client`.

## Required Environment Variables

Set these in the hosting dashboard:

```env
MONGO_URI=
JWT_SECRET=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

EMAIL_USER=
EMAIL_PASS=

FRONTEND_URL=https://your-hosted-app-url.onrender.com
API_URL=https://your-hosted-app-url.onrender.com

PAYFAST_MODE=sandbox
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
```

Do not set `REACT_APP_API_URL` for this single-domain prototype. The client falls back to `/api`.

## MongoDB Atlas

For quick prototype testing, MongoDB Atlas must allow the host to connect.

In Atlas:

1. Open your project
2. Go to **Network Access**
3. Add `0.0.0.0/0` for prototype testing, or add your host's static outbound IP if your host provides one
4. Confirm your database user credentials match `MONGO_URI`

## After Deployment

Visit:

```text
https://your-hosted-app-url.onrender.com
```

Check the API health endpoint:

```text
https://your-hosted-app-url.onrender.com/api/health
```

Expected response:

```json
{
  "message": "API is running"
}
```

## Local Production Test

From the project root:

```powershell
cd client
npm.cmd run build
cd ..\server
npm.cmd start
```

Then open:

```text
http://localhost:5000
```

The React app should load from the backend server.
