import React from 'react'
import { Dropdown, Grid, Input } from 'semantic-ui-react'
import ProductItem from '../components/ProductItem';
import { Product } from '../model'

interface Props {
    products: Product[]
}


export default function Products(props: Props) {




    const chunks = () => {
        const res = [];
        const brojRedova = Math.ceil(props.products.length / 4);

        for (let i = 0; i < brojRedova; i++) {
            const m = Math.min(i + 4, props.products.length);
            console.log(m);
            res[i] = props.products.slice(i, m);
        }
        return res;
    }

    return (
        <Grid padded container>
            <Grid.Row >
                <Grid.Column >
                    <Input placeholder='Naziv...' />
                </Grid.Column>
                <Grid.Column floated='right' >
                    <Dropdown selection placeholder='Kategorija...' />
                </Grid.Column>

            </Grid.Row>
            {
                chunks().map(element => {
                    return (<Grid.Row centered columns='16'>
                        {
                            element.map(product => {
                                return (
                                    <Grid.Column key={product.id} width='4' >
                                        <ProductItem product={product} />
                                    </Grid.Column>
                                )
                            })
                        }
                    </Grid.Row>)
                })
            }
        </Grid>
    )
}
