import React from 'react'
import { Grid } from 'semantic-ui-react'

interface Props {
    name: string,
    value: string | number
}

export default function Property(props: Props) {
    return (
        <Grid.Row columns='16'>
            <Grid.Column width='6'>{props.name}</Grid.Column>
            <Grid.Column width='10'>{props.value}</Grid.Column>
        </Grid.Row>
    )
}
