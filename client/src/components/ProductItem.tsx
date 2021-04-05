import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Button, Card, Image } from 'semantic-ui-react'
import { Product } from '../model'

interface Props {
    product: Product,
    addOrder: () => void
}
export default withRouter(function ProductItem(props: Props & RouteComponentProps) {
    return (
        <Card centered link >
            <Image className='short' onClick={() => {
                props.history.push('/products/' + props.product.id)
            }} src={`data:image/jpeg;base64,${props.product.picture}`} wrapped ui={false} />
            <Card.Content onClick={() => {
                props.history.push('/products/' + props.product.id)
            }} >
                <Card.Header>{props.product.name}</Card.Header>
                <Card.Description >{props.product.price}$</Card.Description >
            </Card.Content>
            <Card.Content extra>
                <Button floated='right' fluid color='green' onClick={() => {
                    props.addOrder();
                }}>Add to cart</Button>

            </Card.Content>
        </Card>
    )
})
