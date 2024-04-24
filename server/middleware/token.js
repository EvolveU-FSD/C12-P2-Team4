//JWT Middleware
import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) {
    return res
      .status(401)
      .json({ error: "Unauthorized, valid authentication required " })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Session no longer valid, please log-in" })
    }

    //if token is valid
    req.user = user
    next()
  })
}
