import React, { useState } from 'react'
import { Container, Dropdown, DropdownItemProps, Grid, Input } from 'semantic-ui-react'
import ProductItem from '../components/ProductItem';
import { Product, ProductCategory } from '../model'

interface Props {
    products: Product[],
    categories: ProductCategory[],
    addOrder: (product: Product, ammount?: number) => void
}


export default function Products(props: Props) {



    const [sort, setSort] = useState(-1);
    const [categoryId, setCategoryId] = useState(-1);
    const chunks = (products: Product[]) => {
        console.log(products);
        const res = [];
        const brojRedova = Math.ceil(products.length / 4);
        console.log(brojRedova)
        for (let i = 0; i < brojRedova; i++) {
            const m = Math.min(4 * (i + 1), products.length);
            console.log(m);
            res[i] = products.slice(i * 4, m);
        }
        return res;
    }

    return (
        <Container >
            <Grid padded >
                <Grid.Row columns='16' >
                    <Grid.Column width='12' >
                        <Dropdown selection value={categoryId} placeholder='Category...' options={[{
                            text: 'All products',
                            key: -1,
                            value: -1,
                            onClick: () => { setCategoryId(-1) }
                        },
                        ...props.categories.map((element): DropdownItemProps => {
                            return {
                                text: element.name,
                                value: element.id,
                                key: element.id,
                                onClick: () => { setCategoryId(element.id) }
                            }
                        })
                        ]} />
                    </Grid.Column>
                    <Grid.Column width='4'   >
                        <Dropdown fluid selection value={sort} placeholder='Sort...' options={[{
                            text: 'Price ascending',
                            key: 1,
                            value: 1,
                            onClick: () => { setSort(1) }
                        }, {
                            text: 'Price descending',
                            key: 2,
                            value: -1,
                            onClick: () => { setSort(-1) }
                        }]} />
                    </Grid.Column>

                </Grid.Row>
                {
                    chunks(props.products
                        .filter(element => categoryId === -1 || element.productCategory.id === categoryId)
                        .sort((a, b) => {
                            return sort * (a.price - b.price)
                        })
                    )
                        .map(element => {
                            return (<Grid.Row columns='16'>
                                {
                                    element.map(product => {
                                        return (
                                            <Grid.Column key={product.id} width='4' >
                                                <ProductItem product={product} addOrder={() => {
                                                    props.addOrder(product);
                                                }} />
                                            </Grid.Column>
                                        )
                                    })
                                }
                            </Grid.Row>)
                        })
                }
            </Grid>
        </Container>
    )
}
