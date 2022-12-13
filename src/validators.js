import * as yup from "yup"

export const idValidator = yup
  .number()
  .integer()
  .min(1)
  .typeError("ID must be a positive integer")
  .label("ID")

export const descriptionValidator = yup
  .string()
  .min(1)
  .trim()
  .label("Description")

export const doneValidator = yup.boolean().label("Done")
