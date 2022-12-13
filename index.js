import express from "express"
import config from "./src/config.js"
import { readDB } from "./src/db.js"
import logger from "./src/middlewares/logger.js"
import makeRouteTodos from "./src/routes/todos.js"

const app = express()

app.use(logger)
app.use(express.json())

const db = await readDB()

makeRouteTodos({ app, db })

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Listening on :${config.port}`))
