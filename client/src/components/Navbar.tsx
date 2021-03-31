import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
interface Props {
    full: boolean,
    admin?: boolean,
    logout: () => void
}
export default function Navbar(props: Props) {

    return (

        <Menu borderless fluid>
            {
                props.full ? (
                    <>
                        <Menu.Item as={Link} to='/'>Home</Menu.Item>
                        <Menu.Item as={Link} to='/products'>Products</Menu.Item>
                        {
                            props.admin && (
                                <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
                            )
                        }
                        <Menu.Menu position='right'>
                            <Menu.Item icon='cart' title='cart' as={Link} to='/cart' />
                            <Menu.Item onClick={props.logout}>logout</Menu.Item>
                        </Menu.Menu>
                    </>
                ) : (
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to='/login'>Login</Menu.Item>


                        <Menu.Item as={Link} to='/register'>Register</Menu.Item>
                    </Menu.Menu>
                )
            }
        </Menu>

    )
}
