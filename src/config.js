import { resolve } from "node:path"

const config = {
  port: 3000,
  security: {
    auth: {
      token: "my-secret",
    },
  },
  db: {
    file: resolve("./.todos"),
  },
}

export default config
