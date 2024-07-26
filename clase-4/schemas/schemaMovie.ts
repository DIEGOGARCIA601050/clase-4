import z from 'zod'
type DittoID = `${string}-${string}-${string}-${string}-${string}`;
type Object = {
  id?: DittoID
  title?: string
  year: number
  director: string
  genre: string[]
  rate: 1|2|3|4|5|6|7|8|9|10
  poster?: string
  timestamp?: number
  duration:number
}
const movieSchema = z.object({
  title: z.string({
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

export function ValidateMovie (object:Object) {
  const validate = movieSchema.safeParse(object)
  return validate
}

export function validateParcialMovie (object:Object) {
  const validate = movieSchema.partial().safeParse(object)
  return validate
}
