import React from 'react'
import AutoCompleteInputItem from './AutoCompleteInputItem'

const AutoCompleteInputItemOverview = ({ data, ...otherProps }) =>
    data.map((item, index) => (
        <AutoCompleteInputItem key={index} item={item} {...otherProps} />
    ))

export default AutoCompleteInputItemOverview
