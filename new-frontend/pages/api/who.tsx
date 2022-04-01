import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    console.log(session);
    const token = jwt.sign(
      { email: session.user.email },
      process.env.AUTH_TOKEN_SECRET,
      {
        algorithm: "HS256",
      }
    );
    res.status(200).json({ token });
  } else {
    // Not Signed in
    res.status(401).json({ token: null });
  }
  res.end();
};

export default handler;
