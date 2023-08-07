import { Navigate, useLocation, useNavigate } from "react-router-dom"

export const Authorized = ({ children, props }) => {
    console.warn({ props })
    const location = useLocation()
    const navigate = useNavigate()
    const localUser = JSON.parse(localStorage.getItem("book_user")) || false

    console.warn({ children, localUser, location })
    if (localUser) {
        console.warn({ children })
        if (location.pathname === '/login') location.pathname = '/'
        return children
    }
    else {
        return <Navigate
            to={`/login`}
            replace
            state={{ location }} />
    }
}