import config from "../config.js"

const auth = (req, res, next) => {
  const { authorization = "" } = req.headers

  if (authorization.slice(7) !== config.security.auth.token) {
    res.status(403).send({ error: "forbidden" })

    return
  }

  next()
}

export default auth
