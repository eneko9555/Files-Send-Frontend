/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: "http://localhost:4000/api",
        FRONTEND_URL: "http://localhost:3000"
    },
}

module.exports = nextConfig
