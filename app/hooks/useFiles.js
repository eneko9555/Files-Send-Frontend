import FilesContext from "../providers/FilesProvider"
import { useContext } from "react"

const useFiles = () => {
    return useContext(FilesContext)
}

export default useFiles