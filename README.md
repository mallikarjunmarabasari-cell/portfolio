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

## Frontend environment setup (EmailJS)

This project can send contact form messages through EmailJS directly from the frontend. Set these environment variables in Vercel:

```text
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

If you still want the backend fallback available, also set:

```text
VITE_API_URL=https://portfolio-maqd.onrender.com/api
```

## Deployment

- Frontend deployed on **Vercel**.
- Backend deployed on **Render**.
- EmailJS is configured in the frontend via Vercel environment variables.
- The backend is still available as a fallback for `/api/contact` if EmailJS env vars are not configured.

## Notes

- The backend uses `dotenv` for local environment configuration.
- The frontend uses EmailJS when `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` are set.
- When EmailJS is not configured, the contact form falls back to the `/api/contact` backend route.
- The vertical side strip width has been increased for better visibility.
