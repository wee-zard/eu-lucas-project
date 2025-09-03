import cors from 'cors';

/**
 * Set the cors policy.
 */
export const configureCorsMiddleware = () => {
  // Whitelisted websites where the requests can be sent from.
  const whitelist = ['*', 'http://localhost:3000', 'lucas.image.analyzer.com'];

  // The options for the cors.
  const corsOptions = {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allowed?: boolean) => void
    ) => {
      if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS.'));
      }
    },
    credentials: true,
  };

  // Return the cords
  return cors(corsOptions);
};
