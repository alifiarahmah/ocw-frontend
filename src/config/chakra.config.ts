// extend chakra theme

import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Merriweather, serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    biru: {
      100: '#CFF5E7',
      200: '#A0E4CB',
      500: '#59C1BD',
      600: '#0D4C92',
    },
  },
})
