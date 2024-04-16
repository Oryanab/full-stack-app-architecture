import React from 'react';
import { HEADER_NAME } from '../constants';
import { Box, styled } from '@mui/material';
import { useSession } from '../contexts/UseSession';

const Container = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
});

const Header = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    background: '#050459'
});

const AppContnet = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex'
});

const Sidebar = styled(Box)({
    width: '16%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRight: '1px solid lightgrey',
    alignItems: 'center'
});

const Content = styled(Box)({
    flex: 1,
    height: '100%'
});

const Home = () => {
    const { organization, user, loadingSession } = useSession();

    return (
        <Container>
            <Header>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '16%'
                    }}
                >
                    <img
                        src={organization?.organization_logo}
                        alt="logo"
                        width={150}
                        height={150}
                    />
                </Box>
            </Header>
            <AppContnet>
                <Sidebar>
                    <Box
                        sx={{
                            flex: 1,
                            color: '#050459',
                            fontSize: '24px',
                            fontWeight: 600,
                            marginTop: 5
                        }}
                    >
                        Hello, {user.username}
                    </Box>
                </Sidebar>
                <Content />
            </AppContnet>
        </Container>
    );
};

export default Home;
