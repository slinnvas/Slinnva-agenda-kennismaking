# Slinnva agenda online zetten

De agenda werkt als website met een kleine server. Zet deze map online bij een host die Node.js ondersteunt, bijvoorbeeld Render, Railway, Fly.io, VPS hosting of een vergelijkbare Node.js hosting.

## Belangrijk

De klant gebruikt:

`https://jouwdomein.nl/agenda.html`

Beheer gebruikt u apart:

`https://jouwdomein.nl/agenda-beheer.html`

## E-mail instellen

Voor automatisch doorsturen naar `info@slinnva.com` heeft de server deze instellingen nodig:

`RESEND_API_KEY`

`CONTACT_EMAIL_FROM`

Gebruik als afzender bij voorkeur een adres op uw eigen domein, bijvoorbeeld:

`Slinnva Professionals <agenda@slinnvaprofessionals.nl>`

Zonder deze instellingen kan de server geen automatische e-mail versturen.

## Startcommando

Gebruik bij de hosting:

`npm start`

De server gebruikt automatisch de poort die de hosting aanbiedt via `PORT`.
