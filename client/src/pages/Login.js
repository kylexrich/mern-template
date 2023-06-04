import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Alert,
    AlertIcon, InputRightElement, InputGroup,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser, setError} from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../api/axiosInstance";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {FaGoogle} from "react-icons/fa";

export default function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        dispatch(setError(null));
        setCredentials((state) => ({...state, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
    };

    const handleGoogleLogin = () => {
        dispatch(setError(null));
        window.location.href = baseUrl + '/auth/google';
    }
    const navigateToRegister = () => {
        dispatch(setError(null));
        navigate('/register');
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.800'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={'white'}>
                        Sign in to your account
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={'gray.700'}
                    boxShadow={'lg'}
                    p={8}>
                    {error && (
                        <Alert status="error" mb={5}>
                            <AlertIcon/>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel color={'white'}>Email address</FormLabel>
                                <Input name="email" type="email" color={'white'} onChange={handleChange}/>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel color={'white'}>Password</FormLabel>
                                <InputGroup>
                                    <Input name="password" type={showPassword ? 'text' : 'password'} color={'white'}
                                           onChange={handleChange}/>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={2}>
                                <Button
                                    bg={'blue.600'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.700',
                                    }}
                                    type="submit"
                                >
                                    Sign in
                                </Button>
                                <Text align='center' color={'white'}>
                                    or
                                </Text>

                                <Button
                                    bg={'red.600'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.700',
                                    }}
                                    onClick={handleGoogleLogin}
                                    leftIcon={<FaGoogle/>}
                                >
                                    Login with Google
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                    <Stack justify="center" mt={4}>
                        <Text align={'center'} color={'white'}>
                            Don't have an account? <Link onClick={navigateToRegister} color={'blue.400'}>Create
                            one!</Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
