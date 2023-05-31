import { createContext, useState } from "react"
import axiosClient from "../axios/axiosClient"
import useAuth from "../hooks/useAuth"

const FilesContext = createContext()


const FilesProvider = ({ children }) => {

    const [alert, setAlert] = useState({})
    const { auth } = useAuth()
    const [file, setFile] = useState({})
    const [password, setPassword] = useState("")
    const [numberDownloads, setNumberDownloads] = useState(0)

    function showAlert(alert) {
        setAlert(alert)
        setTimeout(() => {
            setAlert({})
        }, 5500)
    }

    async function uploadFile(acceptedFiles) {
        const formData = new FormData()
        formData.append("file", acceptedFiles[0])
        const result = await axiosClient.post("/files", formData)
        setFile({ name: result.data.file, original_name: acceptedFiles[0].name })
    }

    async function createLink() {
        try {
            if (!auth._id) {
                const { data } = await axiosClient.post("/links", file)
                setFile({ ...file, url: data.msg })
            } else {
                const fileAuth = { ...file, downloads: +numberDownloads, password }

                let token = localStorage.getItem('token_FILES_SEND')
                if (!token) return
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axiosClient.post("/links", fileAuth, config)
                setFile({ ...file, url: data.msg, downloads: +numberDownloads, password })
            }

        } catch (error) {
            console.log(error);
        }
    }

    function filesList(acceptedFiles) {
        const files = acceptedFiles.map(file => (
            <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
                <p className="font-bold text-lg">{file.path}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KBs</p>
            </li>
        ))
        return files
    }

    function resetState() {
        setAlert({})
        setFile({})
        setNumberDownloads(0)
        setPassword("")
    }

    return (
        <FilesContext.Provider
            value={{
                showAlert,
                alert,
                uploadFile,
                createLink,
                file,
                resetState,
                filesList,
                setNumberDownloads,
                setPassword
            }}
        >
            {children}
        </FilesContext.Provider>
    )
}

export { FilesProvider }

export default FilesContext