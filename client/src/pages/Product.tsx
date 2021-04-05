import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Button, Container, Grid, Image } from 'semantic-ui-react'
import { Product } from '../model'

interface Props {
    getProduct: (id: number) => Product | undefined,
    addOrder: (product: Product, ammount?: number) => void
}

export default withRouter(function Product(props: RouteComponentProps & Props) {
    const product = props.getProduct(parseInt((props.match.params as any).id));
    if (!product) {
        return (
            <div>No such product with given id</div>
        )
    }
    return (
        <Container >
            <Grid className='white' padded centered>
                <Grid.Row columns='16'>
                    <Grid.Column width='8'>
                        <Image src={`data:image/jpeg;base64,${product.picture}`} wrapped fluid />
                    </Grid.Column>
                    <Grid.Column width='8'>
                        <h2>{product.name}</h2>

                        <h3> <b>Category </b> {product.productCategory.name}</h3>

                        <h3>
                            <b>Price: </b> {product.price}$
                        </h3>
                        <hr />
                        <p>
                            {product.description}
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns='16'>
                    <Grid.Column floated='right' width='4'>
                        <Button positive fluid floated='right' onClick={() => {
                            props.addOrder(product);
                        }}>Add to cart</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
})
