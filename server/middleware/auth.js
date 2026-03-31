import { getAuth } from "@clerk/express";

export const protect = (req, res, next) => {

  const { userId } = getAuth(req);


  if (!userId) {
    return res.json({
      success: false,
      message: "not authenticated"
    });
  }

  req.userId = userId;
  next();
};