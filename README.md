# False Color Viewer Website

Marketing site for False Color Viewer.

## Development

```bash
npm install
npm run dev
```

## Deployment

This app is intended for Vercel with the project name `false-color-website`.
The target production domain is `falsecolorviewer.com` once the domain is
purchased and DNS is pointed at Vercel.

## Analytics

Google Analytics loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set to the
site's GA4 web stream ID. The App Store badge also sends an `app_store_click`
event to GA when that variable is present.
