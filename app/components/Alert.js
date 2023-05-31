
const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? " bg-red-700" : "bg-cyan-700 "} mb-2 text-white font-semibol text-center w-full p-2 rounded-md`}>{alert.msg}</div>
  )
}

export default Alert