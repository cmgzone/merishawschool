# Deployment Notes: Contabo VPS + Coolify

## Production Build

- Install dependencies: `npm install`
- Run typecheck: `npm run typecheck`
- Run lint: `npm run lint`
- Build: `npm run build`
- Start: `npm run start`

## Coolify Setup

- Create a new application in Coolify from the project Git repository.
- Use Node.js buildpack or Docker/Nixpacks default Node detection.
- Build command: `npm run build`
- Start command: `npm run start`
- Expose port: `3000`

## Environment Variables

- No required environment variables for the current static/contact-lite build.
- Add SMTP, Resend, Formspree, or another provider later if the contact form should send mail from the website.

## VPS Notes

- Point the production domain DNS to the Contabo VPS.
- Configure Coolify reverse proxy and SSL certificate.
- Confirm PDF and image assets are included in `/public`.
- Re-run the production build after replacing placeholder content or external Google Drive documents.

