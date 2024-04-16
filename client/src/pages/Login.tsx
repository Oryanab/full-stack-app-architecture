import { AccountCircle, Apartment, Key, Mail } from '@mui/icons-material';
import {
    Box,
    BoxProps,
    Button,
    CircularProgress,
    Input,
    InputAdornment,
    styled
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    LoginSchema,
    RegisterSchema,
    loginSchema,
    registerSchema
} from '../constants';
import axios from 'axios';
import { API_MAP } from '../utils/api-map.utils';

const Container = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
});

const MainSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
    height: 'calc(100% - 84px)',
    width: 'calc(100% - 160px)'
});

const ImageSection = styled('img')({
    height: 500,
    width: 600
});

const LoginSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    background: '#FFF',
    padding: '50px',
    height: 560,
    width: 500,
    borderRadius: 4,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    gap: 40
});

const LoginSectionHeader = styled(Box)({
    fontWeight: 600,
    fontSize: 30,
    color: '#050459'
});

const LoginSectionRegisterNote = styled(Box)({
    fontWeight: 400,
    fontSize: 16,
    color: '#000000',
    position: 'relative',
    bottom: 0,

    '.link': {
        color: '#050459',
        cursor: 'pointer',
        fontWeight: 600
    }
});

const FieldInput = styled(Input)({
    background: '#ECECEC',
    display: 'flex',
    alignContent: 'center',
    fontSize: 16,
    fontWeight: 400,
    width: '100%',
    height: 48,
    color: '#868686',
    padding: '5px 10px',
    borderRadius: 4
});

const SubmitButton = styled(Button)({
    background: '#050459',
    display: 'flex',
    alignContent: 'center',
    fontSize: 16,
    fontWeight: 400,
    width: 200,
    height: 40,
    textTransform: 'capitalize',
    color: '#FFF',
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 20,

    ':hover': {
        background: '#050459'
    }
});

interface ErrorBox extends BoxProps {
    show: boolean;
}
const Error = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'show'
})<ErrorBox>(({ show }) => ({
    fontWeight: 200,
    color: 'red',
    height: 8,
    display: show ? 'block' : 'none'
}));

const Login = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register: loginProps,
        formState: { errors: loginErrors },
        handleSubmit: handleLoginSubmit,
        reset: loginReset
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const {
        register: registerProps,
        formState: { errors: registerErrors },
        handleSubmit: handleRegisterSubmit,
        reset: registerReset
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    useEffect(() => {
        loginReset();
        registerReset();
    }, [hasAccount, loginReset, registerReset]);

    const onSubmitLogin = useCallback(async (values: LoginSchema) => {
        setLoading(true);
        try {
            await axios.post(
                `http://localhost:8080/${API_MAP.Login()}`,
                values,
                {
                    withCredentials: true
                }
            );
            setLoading(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    const onSubmitRegister = useCallback(async (values: RegisterSchema) => {
        setLoading(true);
        try {
            await axios.post(
                `http://localhost:8080/${API_MAP.Register()}`,
                values,
                {
                    withCredentials: true
                }
            );
            setLoading(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    return (
        <Container>
            <MainSection>
                <ImageSection src="/images/welcome.png" />
                <LoginSection>
                    <LoginSectionHeader>
                        {hasAccount ? 'Login' : 'Register'}
                    </LoginSectionHeader>
                    <Box
                        sx={{
                            width: '100%',
                            display: hasAccount ? 'flex' : 'none',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <FieldInput
                            id="email"
                            type="email"
                            placeholder="Enter Your Email"
                            {...loginProps('email')}
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <Mail
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!loginErrors.email}>
                            {loginErrors.email?.message}
                        </Error>
                        <FieldInput
                            id="password"
                            type="password"
                            placeholder="Enter Your Password"
                            {...loginProps('password')}
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!loginErrors.password}>
                            {loginErrors.password?.message}
                        </Error>

                        <SubmitButton
                            onClick={handleLoginSubmit(onSubmitLogin)}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={20}
                                    thickness={8}
                                    sx={{ color: '#FFF' }}
                                />
                            ) : (
                                'Login'
                            )}
                        </SubmitButton>
                        <Error show={!!error}>
                            {loginErrors.password?.message}
                        </Error>
                    </Box>
                    <Box
                        // Register
                        sx={{
                            width: '100%',
                            display: hasAccount ? 'none' : 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <FieldInput
                            id="username"
                            type="text"
                            placeholder="Enter Your Username"
                            {...registerProps('username')}
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!registerErrors.username}>
                            {registerErrors.username?.message}
                        </Error>

                        <FieldInput
                            id="email"
                            type="email"
                            placeholder="Enter Your Email"
                            {...registerProps('email')}
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <Mail
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!registerErrors.email}>
                            {registerErrors.email?.message}
                        </Error>

                        <FieldInput
                            id="password"
                            type="password"
                            placeholder="Enter Your Password"
                            {...registerProps('password')}
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!registerErrors.password}>
                            {registerErrors.password?.message}
                        </Error>

                        <FieldInput
                            id="password_cofirm"
                            type="password"
                            {...registerProps('password_cofirm')}
                            placeholder="Confirm Your Password"
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!registerErrors.password_cofirm}>
                            {registerErrors.password_cofirm?.message}
                        </Error>

                        <FieldInput
                            id="organization_name"
                            type="text"
                            placeholder="Enter Your Organization Name"
                            {...registerProps('organization_name')}
                            disableUnderline
                            startAdornment={
                                <InputAdornment position="start">
                                    <Apartment
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            color: '#050459'
                                        }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Error show={!!registerErrors.organization_name}>
                            {registerErrors.organization_name?.message}
                        </Error>

                        <SubmitButton
                            onClick={handleRegisterSubmit(onSubmitRegister)}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={20}
                                    thickness={8}
                                    sx={{ color: '#FFF' }}
                                />
                            ) : (
                                'Register'
                            )}
                        </SubmitButton>
                        <Error show={!!error}>{error}</Error>
                    </Box>
                    <LoginSectionRegisterNote>
                        {hasAccount
                            ? 'Dont have an accout?'
                            : 'I have an account!'}{' '}
                        <span
                            onClick={() => setHasAccount(!hasAccount)}
                            className="link"
                        >
                            {hasAccount ? 'Register' : 'Login'}
                        </span>
                    </LoginSectionRegisterNote>
                </LoginSection>
            </MainSection>
        </Container>
    );
};

export default Login;
