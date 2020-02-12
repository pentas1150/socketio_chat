declare global {
  namespace Express {
    interface Request {
      user?: {
        email?: string;
        nickname?: string;
        snsId?: string;
        provider?: string;
      };
    }
  }
}
