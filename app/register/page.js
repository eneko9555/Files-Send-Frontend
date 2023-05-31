"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import useAuth from "../hooks/useAuth"
import Alert from "../components/Alert"
import PuffLoader from "react-spinners/PuffLoader"

const page = () => {

  const { registerUser, alert, loading} = useAuth()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, 'El nombre es demasiado corto')
        .max(20, 'El nombre es demasiado largo')
        .required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El Email es obligatorio"),
      password: Yup.string()
        .min(6, 'La contraseña debe contener al menos 6 caracteres')
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: async values => {
      await registerUser(values, formik.resetForm)      
    }
  })


  return (
    <div className="md:w-3/4 lg:w-1/2 m-5 md:m-auto">
      <h2 className="text-4xl font-bold mt-24 text-center mb-8">Crea Tu Cuenta</h2>
      <form className=" bg-white shadow-md py-8 rounded-md p-5" onSubmit={formik.handleSubmit}>
        {alert.msg && <Alert alert={alert} />}
        <div className="mb-5">
          <label className="font-semibold mb-8 text-lg">Nombre</label>
          <div className="flex items-center justify-end">
            <input className="w-full border-2 rounded-md p-2 mt-2 relative" type="text" id="name" placeholder="Nombre de usuario" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute mt-2 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className="my-2 bg-gray-200 border-l-4 rounded-md border-red-700 text-red-700 p-2">
              <p className="font-semibold">{formik.errors.name}</p>
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="font-semibold mb-8 text-lg">Email</label>
          <input className="w-full border-2 rounded-md p-2 mt-2" id="email" type="text" placeholder="Email de usuario" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email && (
            <div className="my-2 bg-gray-200 border-l-4 border-red-700 rounded-md text-red-700 p-2">
              <p className="font-semibold">{formik.errors.email}</p>
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="font-semibold mb-8 text-lg">Contraseña</label>
          <input className="w-full border-2 rounded-md p-2 mt-2" type="password" id="password" placeholder="Contraseña de usuario" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.password && formik.errors.password && (
            <div className="my-2 bg-gray-200 border-l-4 border-red-700 rounded-md text-red-700 p-2">
              <p className="font-semibold">{formik.errors.password}</p>
            </div>
          )}
        </div>
        
        <button type="submit"  className="w-full bg-cyan-700 p-3 text-white font-semibold uppercase rounded-md hover:opacity-70 hover:cursor-pointer duration-300" >{loading ? <PuffLoader size={20} color="white" loading={loading}/> : "Registrar"}</button>
      </form>
    </div>
  )
}

export default page