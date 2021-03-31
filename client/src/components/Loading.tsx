import React from 'react'
import { Container, Dimmer, Loader, Segment } from 'semantic-ui-react'

export default function Loading() {
    return (
        <Container fluid>
            <Segment style={{ height: '100vh' }} padded size='huge'>
                <Dimmer inverted active >
                    <Loader>Loading</Loader>
                </Dimmer>


            </Segment>
        </Container>
    )
}
