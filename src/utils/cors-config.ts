export const corsConfig = (client: string) => ({
  origin: [client],
  credentials: true,
  exposedHeaders: 'set-cookie',
})
