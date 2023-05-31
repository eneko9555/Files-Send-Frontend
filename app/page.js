"use client"
import { Typewriter } from 'react-simple-typewriter'
import Link from 'next/link'
import Dropzone from './components/Dropzone'



export default function Home() {

  return (
    <>
      <div className="md:w-5/5 m-auto lg:w-4/5 mx-8 md:mx-auto mt-26 ">
        <div className="lg:flex items-center md:shadow-lg p-5 bg-white rounded-lg py-10 gap-5 ">

        <div className="md:flex-1 md:mb-0 mx-2 lg:mt-0 ">
            <h2 className="text-4xl font-sans font-bold text-gray-800"><Typewriter words={["Compartir archivos de forma sencilla y  privada"]} cursor cursorStyle='_' /></h2>
            <p className="text-lg mt-8 leading-loose">
              <span className=" text-cyan-700 font-bold">FILES </span><span className="text-black font-bold">SEND </span>
              te permite compartir archivos con cifrado de extremo a extremo y los archivos se eliminan despues de ser descargados. Así que puedes mantener los que compartas en privado y asegurarte de que tus archivos no permanezan en línea para siempre.
            </p>
            <div className='flex justify-start mt-5'>
              <Link className='text-cyan-700 text-md font-semibold hover:text-black duration-300' href={"/register"}>Crea una cuenta para obtener todos los beneficios!</Link>
            </div>
          </div>

          <div className=" mx-2 rounded-md flex flex-col h-96 mt-10 lg:h-auto items-center justify-center bg-gray-100 lg:mt-0 lg:w-1/2 border-2 border-dashed border-gray-400 ">
            <Dropzone />
          </div>

         
        </div>
      </div>
    </>
  )
}

