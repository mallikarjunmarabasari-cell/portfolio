# Creative Portfolio

This is a personal portfolio project built with a React + Vite frontend and an Express backend.

## What it includes

- Frontend: `frontend` directory using React, TypeScript, Tailwind CSS, and Vite.
- Backend: `backend` directory using Node.js, Express, Nodemailer, and Gmail SMTP.
- Contact form wired to send real email submissions.
- Deployed frontend on Vercel and backend on Render.

## Run locally

1. Install dependencies:

```bash
pnpm install
```

2. Start the backend:

```bash
pnpm --filter @workspace/api-server run dev
```

3. Start the frontend:

```bash
pnpm --filter @workspace/portfolio run dev
```

4. Open the frontend in the browser at:

```text
http://localhost:5174
```

## Backend environment setup

Create a local `.env` file in `backend/` from `backend/.env.example` and set:

```env
NODE_ENV=development
PORT=3001
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

Use a Gmail App Password for `GMAIL_APP_PASSWORD`.

## Deployment

- Frontend deployed on **Vercel**.
- Backend deployed on **Render**.
- The frontend points to the backend URL via `VITE_API_URL`.

## Notes

- The backend uses `dotenv` for local environment configuration.
- The contact form is wired to `/api/contact` and sends emails through Gmail SMTP.
- The vertical side strip width has been increased for better visibility.
