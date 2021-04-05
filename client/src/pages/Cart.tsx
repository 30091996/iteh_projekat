import React, { useState } from 'react'
import { Button, Container, Form, Grid, Icon, Input, Modal, Pagination, Table } from 'semantic-ui-react'
import { Order } from '../model'
interface Props {
    orders: Order[],
    changeOrder: (order: Order, ammount: number) => void,
    deleteOrder: (order: Order) => void,
    orderUp: (phone: string, adress: string) => Promise<any>;
}
export default function Cart(props: Props) {
    const [activePage, setActivePage] = useState(1)
    const [phone, setPhone] = useState('');
    const [popup, setPopup] = useState(false);
    const [address, setAddress] = useState('');
    const totalPages = Math.ceil(props.orders.length / 4);
    const totalPrice = props.orders.reduce((prev, curr) => {
        return prev + curr.ammount * curr.product.price;
    }, 0)
    return (
        <Container >
            {popup && (
                <Modal
                    open={popup}
                    onClose={() => setPopup(false)}
                    onOpen={() => setPopup(true)}
                    centered={false}
                >
                    <Modal.Header>Thank you!</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            Your order is successfully saved
        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setPopup(false)}>OK</Button>
                    </Modal.Actions>
                </Modal>
            )}
            <Grid padded>
                <Grid.Row>
                    <Table sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>Unit price</Table.HeaderCell>
                                <Table.HeaderCell >Ammount</Table.HeaderCell>
                                <Table.HeaderCell>Total price</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                props.orders.slice((activePage - 1) * 4, 4 * activePage).map(element => {
                                    return (
                                        <Table.Row key={element.product.id} >
                                            <Table.Cell>{element.product.name}</Table.Cell>
                                            <Table.Cell>{element.product.productCategory.name}</Table.Cell>
                                            <Table.Cell>{element.product.price}</Table.Cell>
                                            <Table.Cell >
                                                <Input fluid value={element.ammount} type='number' min='1' onChange={(e) => {
                                                    props.changeOrder(element, parseInt(e.currentTarget.value));
                                                }} />
                                            </Table.Cell>
                                            <Table.Cell >{element.product.price * element.ammount}$
                                             </Table.Cell>
                                            <Table.Cell>
                                                <Icon name='delete' link onClick={() => {
                                                    props.deleteOrder(element);
                                                }} />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row >
                                <Table.HeaderCell colSpan='4'>
                                    <Pagination
                                        totalPages={totalPages}
                                        activePage={activePage}
                                        onPageChange={(event, data) => {
                                            console.log(data);
                                            if (typeof data.activePage === 'string') {

                                                setActivePage(parseInt(data.activePage))
                                            } else {
                                                setActivePage(data.activePage || 1);
                                            }
                                        }}

                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell >
                                    <b>
                                        {totalPrice}$
                                    </b>
                                </Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Grid.Row>
                {
                    props.orders.length > 0 && (
                        <>
                            <Grid.Row className='white' centered>
                                <h3>Order details</h3>
                            </Grid.Row>
                            <Grid.Row className='white' centered>
                                <Grid.Column>
                                    <Form onSubmit={async () => {
                                        await props.orderUp(phone, address);
                                        setPopup(true);
                                    }}  >

                                        <Form.Input value={phone} onChange={e => {
                                            const value = e.currentTarget.value;
                                            setPhone(value);
                                        }} fluid required label='Phone' type='tel' />
                                        <Form.Input value={address} onChange={e => {
                                            const value = e.currentTarget.value;
                                            setAddress(value);
                                        }} fluid required label='Adress' placeholder='State, city, street name and number, apartment number' />
                                        <Form.Input label='Total price' readOnly value={totalPrice}></Form.Input>
                                        <Form.Button  >Order</Form.Button>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </>
                    )
                }
            </Grid>
        </Container>
    )
}
