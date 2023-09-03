import { Box, Container } from '@mui/material';
import Navbar from '../navbar';
import Footer from '../footer/Footer';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" position="relative">
            <Navbar />
            <Box id="main-content" pt={2} flexGrow={1} pb="50px">
                <Container maxWidth="xxl">
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
