"use client"

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export default function InfoToast({ error }: { error?: string }) {
  const shown = useRef(false)

  useEffect(() => {
    if (error && !shown.current) {
      shown.current = true
      toast.info(error)
    }
  }, [error])

  return null
}