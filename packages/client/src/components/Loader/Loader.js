import React from 'react'
import './Loader.scss'

const withLoader = Component => ({ isLoading, children, styles, ...props }) => {
    if (isLoading) {
        return (
            <div style={styles} className="loader-wrapper">
                <div className="loader" />
            </div>
        )
    }

    return <Component {...props}>{children}</Component>
}

export default withLoader
