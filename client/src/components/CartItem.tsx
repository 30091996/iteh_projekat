import React from 'react'
import { Grid, Segment, Table } from 'semantic-ui-react'
import { Cart } from '../model'
import Property from './Property'

interface Props {
    cart: Cart
}

export default function CartItem(props: Props) {
    return (
        <Segment  >
            <Grid >
                <Property name='User' value={props.cart.user.firstName + ' ' + props.cart.user.lastName} />
                <Property name='Adress' value={props.cart.adress} />
                <Property name='Phone number' value={props.cart.phone} />
                <Property name='Total' value={props.cart.items.reduce((prev, curr) => { return prev + curr.product.price * curr.ammount }, 0)} />
                <Grid.Row centered textAlign='center'>
                    <h3>Items</h3>
                </Grid.Row>
                <Grid.Row>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Product name</Table.HeaderCell>
                                <Table.HeaderCell>Ammount</Table.HeaderCell>
                                <Table.HeaderCell>Total</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {props.cart.items.map(element => {
                                return (
                                    <Table.Row key={element.product.id}>
                                        <Table.Cell>{element.product.name}</Table.Cell>
                                        <Table.Cell>{element.ammount}</Table.Cell>
                                        <Table.Cell>{element.product.price * element.ammount}</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}
