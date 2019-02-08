export type FetchFunction = (
  url: string | Request,
  init?: RequestInit
) => Promise<Response>

export async function getFetcher(): Promise<FetchFunction> {
  if (process.env.VUE_ENV === 'server') {
    return (await import('node-fetch')).default as any
  }
  return window.fetch
}
