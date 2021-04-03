import React, { useState } from 'react'
import { Container, Form } from 'semantic-ui-react'
import axios from 'axios'

import { SERVER_URL } from '../constants';
import { User } from '../model';


axios.defaults.withCredentials = true;
interface Props {
    setUser: (user: User) => void
}

export default function Register(props: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setlLastname] = useState('');
    const [passError, setPassError] = useState('')
    const onSubmit = async () => {
        if (password !== confirmPassword) {
            setPassError('Passwords do not match');
            return;
        }
        setPassError('');
        try {
            const result = await axios.post(SERVER_URL + '/register', {
                username: username,
                password: password,
                firstName: firstname,
                lastName: lastname
            })
            props.setUser(result.data);
        } catch (error) {

        }
    }
    return (
        <Container>
            <Form onSubmit={onSubmit} size='big'>
                <Form.Input value={firstname} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setFirstname(value);
                }} required label='First name' />
                <Form.Input value={lastname} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setlLastname(value);
                }} required label='Last name' />
                <Form.Input value={username} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setUsername(value);
                }} required label='Username' />
                <Form.Input type='password' value={password} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setPassword(value);
                }} required label='Password' />
                <Form.Input type='password' value={confirmPassword} onChange={(e) => {
                    const value = e.currentTarget.value;
                    setConfirmPassword(value);
                }} required error={passError || undefined} label='Repeat password' />
                <Form.Button fluid>Register</Form.Button>
            </Form>
        </Container>
    )
}
