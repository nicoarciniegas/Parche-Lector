import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import * as yup from 'yup'
import axios from 'axios'
import { authUtils } from '../../utils/auth'

interface LoginData {
  usernameOrEmail: string
  password: string
}

export const useLogin = () => {
  const router = useRouter()

  // Validation schema
  const schema = yup.object({
    usernameOrEmail: yup
      .string()
      .required('El nombre de usuario o email es requerido'),
    password: yup
      .string()
      .required('La contraseña es requerida')
      .min(1, 'La contraseña es requerida'),
  })

  // Form setup with vee-validate
  const { handleSubmit, defineField, errors } = useForm({
    validationSchema: schema,
  })

  const [usernameOrEmail] = defineField('usernameOrEmail')
  const [password] = defineField('password')

  // API mutation with tanstack/vue-query
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      try {
        const response = await axios.post(
          'https://parche-lector.onrender.com/auth/login',
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
          'Error al iniciar sesión'
        throw new Error(errorMessage)
      }
    },
    onSuccess: (data) => {
      // Handle successful login
      console.log('Login exitoso:', data)
      // Save token to localStorage
      if (data?.data?.token) {
        authUtils.setToken(data.data.token)
      }
      router.push('/home')
    },
    onError: (error: Error) => {
      console.error('Error en login:', error)
    },
  })

  const { mutate: login, isPending, error: loginError } = loginMutation

  // Form submission handler
  const onSubmit = handleSubmit((values) => {
    login({
      usernameOrEmail: values.usernameOrEmail,
      password: values.password,
    })
  })

  return {
    usernameOrEmail,
    password,
    errors,
    onSubmit,
    isPending,
    loginError,
  }
}
