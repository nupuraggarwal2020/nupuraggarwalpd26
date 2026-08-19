/* The canonical site URL for metadata, sitemap and schema. On Vercel this
   is the production domain (currently the .vercel.app address, and
   nupur.works automatically once that domain is connected). */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://nupur.works";
