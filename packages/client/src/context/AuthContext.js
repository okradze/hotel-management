import React, { useState } from 'react'

const Context = React.createContext()

const AuthContext = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <Context.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </Context.Provider>
    )
}

export { AuthContext as default, Context }
