import React from 'react'
import spinnerImage from '../assets/Loading_icon.gif'

type Props = {}

function Spinner({ }: Props) {
    return (
        <img src={spinnerImage} alt="Loading..." />
    )
}

export default Spinner