"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ComparisonContextType {
  selectedDorms: number[]
  addDorm: (id: number) => void
  removeDorm: (id: number) => void
  toggleDorm: (id: number) => void
  clearAll: () => void
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedDorms, setSelectedDorms] = useState<number[]>([])

  const addDorm = (id: number) => {
    setSelectedDorms((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeDorm = (id: number) => {
    setSelectedDorms((prev) => prev.filter((d) => d !== id))
  }

  const toggleDorm = (id: number) => {
    setSelectedDorms((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]))
  }

  const clearAll = () => {
    setSelectedDorms([])
  }

  return (
    <ComparisonContext.Provider value={{ selectedDorms, addDorm, removeDorm, toggleDorm, clearAll }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within ComparisonProvider")
  }
  return context
}
