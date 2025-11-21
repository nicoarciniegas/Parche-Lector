import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import * as yup from 'yup'
import axios from 'axios'
import { authUtils } from '../../utils/auth'

interface RegisterData {
  username: string
  email: string
  password: string
}

export const useRegister = () => {
  const router = useRouter()

  // Validation schema
  const schema = yup.object({
    username: yup
      .string()
      .required('El nombre de usuario es requerido')
      .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
      .max(32, 'El nombre de usuario no puede exceder 32 caracteres'),
    email: yup
      .string()
      .required('El email es requerido')
      .email('Debe ser un email válido'),
    password: yup
      .string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  })

  // Form setup with vee-validate
  const { handleSubmit, defineField, errors } = useForm({
    validationSchema: schema,
  })

  const [username] = defineField('username')
  const [email] = defineField('email')
  const [password] = defineField('password')

  // API mutation with tanstack/vue-query
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      try {
        const response = await axios.post(
          'https://parche-lector.onrender.com/auth/register',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              accept: '*/*',
            },
          }
        )
        return response.data
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Error al registrar usuario'
        throw new Error(errorMessage)
      }
    },
    onSuccess: (data) => {
      // Handle successful registration
      console.log('Registro exitoso:', data)
      // Save token to localStorage
      if (data?.data?.token) {
        authUtils.setToken(data.data.token)
      }
      router.push('/home')
    },
    onError: (error: Error) => {
      console.error('Error en registro:', error)
    },
  })

  const { mutate: register, isPending, error: registerError } = registerMutation

  // Form submission handler
  const onSubmit = handleSubmit((values) => {
    register({
      username: values.username,
      email: values.email,
      password: values.password,
    })
  })

  return {
    username,
    email,
    password,
    errors,
    onSubmit,
    isPending,
    registerError,
  }
}
