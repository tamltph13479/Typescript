import React from 'react'
import { Product } from '../types/product';
type ShowInfoProps = {
    person: Product
}

const showInfo = (props: ShowInfoProps) => {
    console.log(props);
    return (
        <div>showInfo</div>
    )
}

export default showInfo