import { makeAddTodo, makeDeleteTodo, makeUpdateTodo } from "../db.js"
import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import {
  descriptionValidator,
  doneValidator,
  idValidator,
} from "../validators.js"

const makeRouteTodos = ({ app, db }) => {
  const addTodo = makeAddTodo(db)
  const deleteTodo = makeDeleteTodo(db)
  const updateTodo = makeUpdateTodo(db)

  app.post(
    "/todos",
    auth,
    validate({
      body: { description: descriptionValidator.required() },
    }),
    async (req, res) => {
      const { description } = req.data.body
      const todo = await addTodo({ description })

      res.status(201).send(todo)
    }
  )
  app.get("/todos", (req, res) => {
    res.send(db.todos)
  })
  app.get("/todos/:id", (req, res) => {
    res.send(db.todos[req.params.id])
  })
  app.patch(
    "/todos/:id",
    auth,
    validate({
      params: { id: idValidator.required() },
      body: {
        description: descriptionValidator,
        done: doneValidator,
      },
    }),
    async (req, res) => {
      const {
        data: {
          body: { description, done },
          params: { id },
        },
      } = req
      const todo = await updateTodo({ id, description, done })

      res.send(todo)
    }
  )
  app.delete("/todos/:id", auth, async (req, res) => {
    const { id } = req.params
    const todo = await deleteTodo(id)

    res.send(todo)
  })
}

export default makeRouteTodos
