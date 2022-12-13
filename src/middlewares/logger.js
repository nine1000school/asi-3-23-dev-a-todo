const logger = (req, res, next) => {
  const now = new Date()

  res.on("finish", () =>
    // eslint-disable-next-line no-console
    console.log(
      `[${now.getFullYear()}-${String(now.getMonth()).padStart(
        2,
        "0"
      )}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}] ${req.method.toUpperCase()} ${req.path} - ${
        Date.now() - now.getTime()
      }ms`
    )
  )

  next()
}

export default logger
