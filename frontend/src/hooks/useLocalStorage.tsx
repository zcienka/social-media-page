import {useState, useEffect} from "react"

export default function useLocalStorage(initialValue: string) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem("profile")
        if (jsonValue != null)
            return JSON.parse(jsonValue)
        else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(value))
    }, [value])

    return [value, setValue]
}
