import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import useFiles from "../hooks/useFiles"
import Alert from "./Alert"
import useAuth from "../hooks/useAuth"

const Dropzone = () => {

    const { showAlert, alert, uploadFile, createLink, file, filesList, setNumberDownloads, setPassword} = useFiles()
    const { auth } = useAuth()

    const onDropRejected = () => {
        showAlert({ msg: "Ups! Tamaño del archivo superior a 1MB, crea una cuenta gratis para poder subir archivos superior a 1MB", error: true })
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => uploadFile(acceptedFiles), [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 })

    return (
        <div className="w-full p-3">
            {alert.msg && <Alert alert={alert} />}

            {file?.name
                ? <div>
                    <h4 className="text-center mb-5 font-bold text-2xl">Archivos</h4>
                    <ul>
                        {filesList(acceptedFiles)}
                    </ul>

                    {file?.url
                        ? <>
                            <p className="text-center text-cyan-700 font-bold"> URL {`${process.env.FRONTEND_URL}/enlaces/${file.url}`}</p>
                            <button type="button" className="bg-green-700 w-full text-center py-2 rounded-md text-white  hover:opacity-70 duration-300 mt-2" onClick={() => navigator.clipboard.writeText(`${process.env.FRONTEND_URL}/enlaces/${file.url}`)}>
                                Copiar Enlace
                            </button>
                        </>
                        : auth._id ?
                            <>
                                <form className="m-2" >
                                    <label className="block">Descargas</label>
                                    <input type="number" onChange={(e) => setNumberDownloads(+e.target.value)}/>

                                    <label className="block mt-2">Contraseña</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                                </form>
                                <button type="button" className="bg-cyan-700 w-full text-center py-2 rounded-md text-white  hover:opacity-70 duration-300" onClick={() => createLink()}>
                                    Crear Enlace
                                </button>
                            </>
                            :
                            <button type="button" className="bg-cyan-700 w-full text-center py-2 rounded-md text-white  hover:opacity-70 duration-300" onClick={() => createLink()}>
                                Crear Enlace
                            </button>
                    }
                </div>

                : <div {...getRootProps({ className: "dropzone w-full py-32" })}>
                    <input className="h-100" {...getInputProps()} />
                    {isDragActive
                        ? <p className="text-center text-xl text-gray-400 font-bold"> Suelta el archivo</p>
                        : <div className="text-center">
                            <p className="text-center font-bold text-gray-500 text-xl">Arrastra aquí el archivo</p>
                            <button className=" bg-cyan-700 w-3/4 text-center py-2 rounded-md text-white my-10 hover:opacity-70 duration-300 ">Selecciona archivos para subir</button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Dropzone