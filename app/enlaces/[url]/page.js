"use client"
import axiosClient from "../../axios/axiosClient"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import Alert from "../../components/Alert"
import useFiles from "@/app/hooks/useFiles"

const page = () => {

  const { url } = useParams()
  const [link, setLink] = useState("")
  const [downloads, setDownloads] = useState()
  const [validate, setValidate] = useState(false)
  const { showAlert, alert, password, setPassword } = useFiles()
  const [passwordClient, setPasswordClient] = useState("")

  async function getLink() {
    try {
      const { data } = await axiosClient(`/links/${url}`)
      setPassword(data.password)
      setDownloads(data.downloads)
      setLink(data.file)
    } catch (error) {
      showAlert({ msg: error.response.data.msg, error: true })
    }
  }

  useEffect(() => {
    getLink()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    let token = localStorage.getItem('token_FILES_SEND')
    
    if (!token) return
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      await axiosClient.post(`/links/${url}`, { passwordClient }, config)
      setValidate(true)
    } catch (error) {
      showAlert({msg: error.response.data.msg, error: true})
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center text-gray-700 mb-5"> Descarga tu archivo</h1>
      {alert.msg && <Alert alert={alert} />}
      <div className=" flex items-center justify-center mt-10">
        {downloads <= 1 ?
          <div className="flex flex-col gap-4">
            <p>No hay descargas disponibles</p>
            <Link href={"/"} onClick={() => getLink()} className="bg-cyan-700 text-center px-10 rounded font-semibold hover:opacity-70 duration-300 text-white uppercase py-3">Volver a Inicio
            </Link>
          </div>
          : link && validate && downloads > 1 ?
            <>
              <div className="text-center">
                <Link href={`${process.env.BACKEND_URL}/files/${link}`} onClick={() => getLink()} className="bg-cyan-700 text-center px-10 rounded font-semibold hover:opacity-70 duration-300 text-white uppercase py-3">Aquí
                </Link>
              </div>
            </>
            : password !== ""  && !validate && downloads > 1 && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center p-2"
              >
                <label>Contraseña para descargar el archivo</label>
                <input type="password" className="p-1" onChange={e => setPasswordClient(e.target.value)} />
                <input type="submit" className="p-1 bg-cyan-700 text-white text-center font-semibold" />
              </form>
            )
        }
      </div>
    </>
  )
}

export default page