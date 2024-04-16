import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormContainer = styled.div`
    width: 300px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    width: 100%;
    padding: 8px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const ErrorMessage = styled.p`
    color: red;
`;

interface FormData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
    const [message, setMessage] = useState<string>('');

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post<string>('/api/auth/login', data);
            setMessage(response.data);
        } catch (error) {
            setError('username', { type: 'manual', message: 'Invalid username or password' });
        }
    };

    return (
        <Container>
        <FormContainer>
            <Title>Login</Title>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('username', { required: true })} placeholder="Username" />
                    {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                <Input type="password" {...register('password', { required: true })} placeholder="Password" />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                <Button type="submit">Login</Button>
            </form>
        </FormContainer>
    </Container>
    );
};

export default Login;