import z from 'zod'
const movieSchema = z.object({
  name: z.string({
    invalid_type_error: 'Dato ingresado incorrecto'
  }),
  genre: z.array(
    z.enum(['Action', 'Drama', 'Sci-Fi', 'Crime', 'Adventure', 'Romance', 'Animation', 'Biography', 'Fantasy']),
    {
      invalid_type_error: 'Dato ingresado incorrecto'
    }
  ),
  duration: z.number({
    invalid_type_error: 'Dato ingresado incorrecto'
  }),
  rate: z.number().min(0).max(10),
  watched: z.boolean({
    invalid_type_error: 'Dato ingresado incorrecto'
  }).default(false)
})

export function ValidateMovie (object) {
  const validate = movieSchema.safeParse(object)
  return validate
}

export function validateParcialMovie (object) {
  const validate = movieSchema.partial().safeParse(object)
  return validate
}
