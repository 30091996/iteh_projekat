import React, { useState } from 'react'
import { Container, Grid, Table } from 'semantic-ui-react'
import CartItem from '../components/CartItem';
import { Cart } from '../model'
interface Props {
    carts: Cart[]
}
export default function Orders(props: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return (
        <Container>
            <Grid padded>
                <Grid.Row columns='16'>
                    <Grid.Column width='5'>
                        <Table selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>CartId</Table.HeaderCell>
                                    <Table.HeaderCell>Total price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {props.carts.map((element, index) => {
                                    return <Table.Row key={element.id} active={index === selectedIndex} onClick={() => {
                                        setSelectedIndex(prev => {
                                            return prev === index ? -1 : index;
                                        })
                                    }}>
                                        <Table.Cell>{element.id}</Table.Cell>
                                        <Table.Cell>{element.items.reduce((prev, curr) => { return prev + curr.ammount * curr.product.price }, 0)}</Table.Cell>
                                    </Table.Row>
                                })}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width='11'>
                        {
                            selectedIndex !== -1 && (
                                <CartItem cart={props.carts[selectedIndex]} />
                            )
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
