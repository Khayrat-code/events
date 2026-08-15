// Supabase integration will be wired up in a later step.
// Storage public URL pattern:
//   https://lnxlzzrcmwfnnbpmepcr.supabase.co/storage/v1/object/public/<BUCKET>/<path>

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export function storageUrl(bucket: string, path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}