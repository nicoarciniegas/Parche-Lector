import axios from 'axios'

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes'

export interface GoogleBook {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
    }
    averageRating?: number
    ratingsCount?: number
    description?: string
    publishedDate?: string
  }
}

export interface Book {
  id: number
  title: string
  author: string
  rating: number
  cover: string
  status?: 'leido' | 'leyendo' | 'por_leer'
}

/**
 * Obtiene libros aleatorios de Google Books API
 * Busca por diferentes términos populares para obtener variedad
 */
export const getRandomBooks = async (maxResults: number = 20): Promise<Book[]> => {
  try {
    // Términos de búsqueda variados para obtener libros diversos
    const searchTerms = [
      'fiction',
      'bestseller',
      'classic',
      'novel',
      'literatura',
      'adventure',
      'mystery',
      'romance',
      'science fiction',
      'fantasy'
    ]
    
    // Seleccionar un término aleatorio
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]
    
    // Índice aleatorio para variar los resultados
    const startIndex = Math.floor(Math.random() * 50)
    
    const response = await axios.get<{ items: GoogleBook[] }>(GOOGLE_BOOKS_API_URL, {
      params: {
        q: randomTerm,
        maxResults: maxResults,
        startIndex: startIndex,
        orderBy: 'relevance',
        printType: 'books',
        langRestrict: 'es' // Priorizar libros en español
      }
    })

    if (!response.data.items) {
      return []
    }

    // Transformar los datos de Google Books a nuestro formato
    return response.data.items
      .filter(book => 
        book.volumeInfo.title && 
        book.volumeInfo.imageLinks?.thumbnail
      )
      .map((book, index) => ({
        id: index + 1,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Autor desconocido',
        rating: book.volumeInfo.averageRating || generateRandomRating(),
        cover: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 
               `https://picsum.photos/200/300?random=${index}`,
        status: undefined
      }))
  } catch (error) {
    console.error('Error al obtener libros de Google Books:', error)
    throw new Error('No se pudieron cargar los libros. Intenta de nuevo más tarde.')
  }
}

/**
 * Busca libros por título o autor
 */
export const searchBooks = async (query: string, maxResults: number = 20): Promise<Book[]> => {
  try {
    if (!query.trim()) {
      return getRandomBooks(maxResults)
    }

    const response = await axios.get<{ items: GoogleBook[] }>(GOOGLE_BOOKS_API_URL, {
      params: {
        q: query,
        maxResults: maxResults,
        orderBy: 'relevance',
        printType: 'books'
      }
    })

    if (!response.data.items) {
      return []
    }

    return response.data.items
      .filter(book => 
        book.volumeInfo.title && 
        book.volumeInfo.imageLinks?.thumbnail
      )
      .map((book, index) => ({
        id: index + 1,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Autor desconocido',
        rating: book.volumeInfo.averageRating || generateRandomRating(),
        cover: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 
               `https://picsum.photos/200/300?random=${index}`,
        status: undefined
      }))
  } catch (error) {
    console.error('Error al buscar libros:', error)
    throw new Error('No se pudieron buscar los libros. Intenta de nuevo.')
  }
}

/**
 * Genera un rating aleatorio entre 3.5 y 5.0 para libros sin rating
 */
const generateRandomRating = (): number => {
  return Math.round((3.5 + Math.random() * 1.5) * 10) / 10
}
