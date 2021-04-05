import React, { useEffect, useRef, useState } from 'react'
import { Container, Form, Grid, Ref, Table } from 'semantic-ui-react'
import { Cart, Product, ProductCategory } from '../model'
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, Sector, Tooltip, XAxis, YAxis } from 'recharts';
import { SERVER_URL } from '../constants';
axios.defaults.withCredentials = true;
interface Props {
    products: Product[],
    categories: ProductCategory[],
    updateProduct: (id: number, name: string, price: number, category: number, description: string) => Promise<any>
    createProduct: (formData: FormData) => Promise<any>
}

export default function Admin(props: Props) {
    const [selectedProductIndex, setselectedProductIndex] = useState(-1);
    const fileRef = useRef<HTMLDivElement>(null);
    const [price, setPrice] = useState(0);
    const [carts, setCarts] = useState<Cart[]>([])
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategoryID, setSelectedCategoryID] = useState(props.categories[0].id);

    useEffect(() => {
        axios.get(SERVER_URL + '/cart').then(res => {
            setCarts(res.data);
        })
    })

    useEffect(() => {

        if (selectedProductIndex === -1) {
            setPrice(0);
            setName('');
            setDescription('');
            setSelectedCategoryID(0);
        } else {
            const product = props.products[selectedProductIndex];
            setPrice(product.price);
            setName(product.name);
            setDescription(product.description);
            setSelectedCategoryID(product.productCategory.id);
        }
    }, [selectedProductIndex])
    return (
        <Container>
            <Grid padded>
                <Grid.Row columns='16'>
                    <Grid.Column width='9'>
                        <Table padded selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    props.products.map((element, index) => {
                                        return (
                                            <Table.Row key={element.id} active={index === selectedProductIndex} onClick={() => {
                                                setselectedProductIndex(prev => {
                                                    return prev === index ? -1 : index;
                                                })
                                            }}>
                                                <Table.Cell>{element.id}</Table.Cell>
                                                <Table.Cell>{element.name}</Table.Cell>
                                                <Table.Cell>{element.productCategory.name}</Table.Cell>
                                                <Table.Cell>{element.price}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width='7'>
                        <h3>
                            {selectedProductIndex === -1 ? 'Create new product' : 'Update product'}
                        </h3>
                        <Form encType="multipart/form-data" onSubmit={async e => {
                            if (selectedProductIndex > -1) {
                                await props.updateProduct(props.products[selectedProductIndex].id, name, price, selectedCategoryID, description);
                                setselectedProductIndex(-1);
                                return;
                            }
                            const data = new FormData();
                            const inputElement = fileRef.current?.lastChild?.lastChild as HTMLInputElement;

                            if (!inputElement.files) {
                                return;
                            }

                            data.append('file', inputElement.files[0]);
                            data.append('name', name);
                            data.append('price', price + '');
                            data.append('description', description);
                            data.append('productCategory', selectedCategoryID + '');
                            props.createProduct(data);
                        }} >
                            <Form.Input value={name} onChange={(e) => {
                                const value = e.currentTarget.value;
                                setName(value);
                            }} label='Name' />
                            <Form.Input value={price} onChange={(e) => {
                                const value = e.currentTarget.value;
                                setPrice(parseFloat(value));
                            }} label='Price' type='number' />
                            <Form.Dropdown label='Category' value={selectedCategoryID} selection options={props.categories.map(element => {
                                return {
                                    text: element.name,
                                    value: element.id,
                                    key: element.id,
                                    onClick: () => {
                                        setSelectedCategoryID(element.id)
                                    }
                                }
                            })} />
                            {selectedProductIndex === -1 && (
                                <Ref innerRef={fileRef}>
                                    <Form.Input required inverted type='file' label='Image' />

                                </Ref>
                            )}
                            <Form.TextArea value={description} onChange={e => {
                                const value = e.currentTarget.value;
                                setDescription(value);
                            }} label='Description' />
                            <Form.Button fluid>Save</Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <h3 style={{ color: 'white' }}>Statistical data</h3>
                </Grid.Row>
                <Grid.Row className='whiteBackground'>
                    <BarChart

                        className='whiteBackground'
                        compact
                        width={1200}
                        height={500}
                        data={props.products.map(product => {
                            const res: any = {
                                product: product.name
                            }
                            let ammount = 0;
                            let totalPrice = 0;

                            for (let cart of carts) {
                                for (let item of cart.items) {
                                    totalPrice += item.ammount * item.product.price;
                                    if (item.product.id === product.id) {
                                        ammount += item.ammount;

                                    }
                                }
                            }
                            const total = ammount * product.price / totalPrice;
                            res.ammount = ammount;
                            res.total = total * 100;
                            return res;

                        })}
                    >
                        <XAxis name='Product' dataKey="product" >

                            <Label value='Products' offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis label={{ value: '', angle: -90, position: 'insideLeft', fontSize: 14 }} minTickGap={1} />
                        <Tooltip />

                        <CartesianGrid strokeDasharray="1 1" stroke="#f5f5f5" />
                        <Bar name='Ammount ordered' dataKey="ammount" fill="blue" />
                        <Bar name='% in cart price' dataKey="total" fill="#83ca9d" />
                    </BarChart>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

