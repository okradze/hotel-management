import React from 'react'

const Context = React.createContext()

const AuthContext = ({ children }) => {
    const [user, setUser] = React.useState()

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    )
}

export { AuthContext as default, Context }
