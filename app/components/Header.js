"use client"
import Link from "next/link"
import useAuth from "../hooks/useAuth"
import useFiles from "../hooks/useFiles"

const Header = () => {

    const { auth, setAuth } = useAuth()
    const {resetState} = useFiles()

    function handleCloseSession() {
        localStorage.removeItem("token_FILES_SEND")
        setAuth({})
    }

    return (
        <header className="mb-20 mt-10 md:flex text-center md:justify-between items-center">
            <Link href={"/"} onClick={() => resetState()}>
                <h1 className="font-bold text-4xl text-cyan-700">FILES <span className="text-black">SEND</span>
                </h1>
            </Link>

            <div className="flex mb-10 sm:mb-0 justify-center mt-8 md:mt-0 md:mb-0 items-center gap-5">
                {auth?._id ?
                    <div className="sm:flex  items-center font-semibold gap-3">
                        <p className="mb-5 sm:mb-0">Hola <span className="capitalize">{auth.name}</span></p>
                        <Link className="p-2 w-40 px-4 text-white rounded-md bg-cyan-700 uppercase text-sm font-medium hover:opacity-50 duration-300" href={"/login"} onClick={handleCloseSession}>Cerrar Sesión</Link>
                    </div>

                    :
                    <>
                        <Link className="p-2 w-40 px-4 text-white rounded-md bg-cyan-700 uppercase text-sm font-medium hover:opacity-50 duration-300" href={"/login"}>Iniciar Sesión</Link>
                        <Link className="p-2 px-4 w-40 text-white rounded-md bg-black uppercase text-sm font-medium hover:opacity-50 duration-300" href={"/register"}>Crear cuenta</Link>
                    </>
                }
            </div>
        </header>
    )
}

export default Header