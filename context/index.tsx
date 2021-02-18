import { createContext } from "react"

export const searchContext = createContext({
    searchName: '',
    setSearchName: (value: string) => {}
})

