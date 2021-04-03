import React from 'react'
import { Card } from 'semantic-ui-react'
import { Product } from '../model'

interface Props {
    product: Product
}
export default function ProductItem(props: Props) {
    return (
        <Card>
            <Card.Header>
                <h3>{props.product.name}</h3>
            </Card.Header>
        </Card>
    )
}
