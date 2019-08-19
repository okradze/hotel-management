import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import withLoader from '../Loader'

const TotalComponent = ({ text, QUERY }) => {
    const { data, loading } = useQuery(QUERY)

    const TotalComponentWithLoading = withLoader(() => (
        <>
            <h3 className="TotalComponent__heading">
                {data[Object.keys(data)[0]]}
            </h3>
            <p className="TotalComponent__text">{text}</p>
        </>
    ))

    return (
        <div className="TotalComponent">
            <TotalComponentWithLoading isLoading={loading} />
        </div>
    )
}

export default TotalComponent
