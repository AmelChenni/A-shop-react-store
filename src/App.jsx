import React from 'react'
import router from './Router'
import { RouterProvider } from 'react-router'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function App() {
  const queryClient = new QueryClient()

  return (
        <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
     </QueryClientProvider>

  )
}
