export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "session-auth-cookie",
  ttl: 60 * 15, //15 minutes
  cookieOptions: {
    secure: false, // process.env.NODE_ENV === "production",
  },
};
