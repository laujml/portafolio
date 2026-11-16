export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function isHttpUrl(value: string | undefined): value is string {
  return Boolean(value && /^https?:\/\//.test(value));
}
