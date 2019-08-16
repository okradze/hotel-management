import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Loader from '../Loader'

const TotalComponent = ({ text, QUERY }) => {
    const { data, loading } = useQuery(QUERY)

    return (
        <div className="TotalComponent">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h3 className="TotalComponent__heading">
                        {data[Object.keys(data)[0]]}
                    </h3>
                    <p className="TotalComponent__text">{text}</p>
                </>
            )}
        </div>
    )
}

export default TotalComponent
