# Deployment Notes: Contabo VPS + Coolify

## Production Build

- Install dependencies: `npm install`
- Run typecheck: `npm run typecheck`
- Run lint: `npm run lint`
- Build: `npm run build`
- Start: `npm run start`

## Coolify Setup

- Create a new application in Coolify from the project Git repository.
- Use Dockerfile deployment, or use Node.js buildpack / Nixpacks default Node detection.
- Dockerfile path: `./Dockerfile`
- Build command: `npm run build`
- Start command: `npm run start`
- Expose port: `3000`

## Docker Persistent Storage

When deploying with the Dockerfile, add persistent storage in Coolify for:

- `/app/data`: stores admin-edited site content in `admin-content.json`.
- `/app/public/uploads`: stores images uploaded from the admin panel.

Do not mount over all of `/app/public`, because that would hide the bundled
static assets from the Docker image.

On first start, the container seeds `admin-content.json` into an empty
`/app/data` mount.

## Environment Variables

- Required for production admin:
  - `ADMIN_EMAIL`: the admin's login email address.
  - `ADMIN_PASSWORD_HASH`: generate with `npm run hash:admin-password -- "long-password-here"`.
  - `ADMIN_SESSION_SECRET`: use a separate long random secret.
- Do not use plain `ADMIN_PASSWORD` in production. It is kept only as a local/dev fallback.
- Optional admin hardening:
  - Put `/admin` behind Cloudflare Access, basic auth, or a VPS-level allowlist if possible.
  - Keep `ADMIN_TRUST_PROXY_HEADERS=false` unless the app is reachable only through a trusted reverse proxy that overwrites `x-forwarded-for`, `x-real-ip`, and `cf-connecting-ip`.
- SMTP is required if the contact form should send mail from the website:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_EMAIL_TO`.
  - Set `CONTACT_SEND_CONFIRMATION=true` only if the mail provider allows safe auto-replies.

## VPS Notes

- Point the production domain DNS to the Contabo VPS.
- Configure Coolify reverse proxy and SSL certificate.
- Ensure the Node.js app is not directly exposed to the public internet outside the Coolify/reverse-proxy entrypoint.
- Confirm PDF and image assets are included in `/public`.
- Re-run the production build after replacing placeholder content or external Google Drive documents.
