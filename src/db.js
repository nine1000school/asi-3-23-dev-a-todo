import { access, constants, readFile, writeFile } from "node:fs/promises"
import config from "./config.js"

export const readDB = async () => {
  try {
    await access(config.db.file, constants.W_OK | constants.R_OK)

    const data = await readFile(config.db.file, { encoding: "utf-8" })

    return JSON.parse(data)
  } catch (err) {
    const defaultDb = {
      lastId: 0,
      todos: {},
    }
    await writeFile(config.db.file, JSON.stringify(defaultDb), {
      encoding: "utf-8",
    })

    return defaultDb
  }
}

export const writeDB = async (db) => {
  await writeFile(config.db.file, JSON.stringify(db), { encoding: "utf-8" })
}

export const makeAddTodo = (db) => async (newTodo) => {
  db.lastId += 1
  const todo = { id: db.lastId, done: false, ...newTodo }
  db.todos[db.lastId] = todo

  await writeDB(db)

  return todo
}

export const makeDeleteTodo = (db) => async (todoId) => {
  const {
    // eslint-disable-next-line no-unused-vars
    todos: { [todoId]: todo, ...todos },
  } = db

  db.todos = todos

  await writeDB(db)

  return todo
}

export const makeUpdateTodo =
  (db) =>
  async ({ id, description, done }) => {
    const {
      todos: { [id]: updatedTodo },
    } = db

    updatedTodo.description = description
    updatedTodo.done = done ?? updatedTodo.done
    db.todos[id] = updatedTodo

    await writeDB(db)

    return updatedTodo
  }
