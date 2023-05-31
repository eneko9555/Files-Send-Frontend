"use client"
import { createContext, useState, useEffect } from "react"
import axiosClient from "../axios/axiosClient"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  let token;

  const [auth, setAuth] = useState({})
  const [alert, setAlert] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function showAlert(alert) {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 2500)
  }

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {

    token = localStorage.getItem('token_FILES_SEND')
    if (!token) return

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await axiosClient("/users/profile", config)
      setAuth(data)
    } catch (error) {
      console.log(error);
    }
  }

  async function registerUser(user, fn) {
    try {
      setLoading(true)
      const { data } = await axiosClient.post("/users/register", user)
      showAlert({ msg: data.msg, error: false })
      fn()
    } catch (error) {
      showAlert({ msg: error.response.data.msg, error: true })
    } finally {
      setLoading(false)
    }
  }

  async function authenticateUser(user) {
    try {
      setLoading(true)
      const { data } = await axiosClient.post("/users/login", user)
      localStorage.setItem("token_FILES_SEND", data)
      getProfile()
      router.push("/")
    } catch (error) {
      showAlert({ msg: error.response.data.msg, error: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        alert,
        loading,
        authenticateUser,
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext