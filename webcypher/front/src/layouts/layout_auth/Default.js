import { Box, Container } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar_auth';
import Footer from '../footer/FooterAuth';


const LayoutAuth = () => {
    return (
        <div>
            <Box display="flex" flexDirection="column" minHeight="75vh" position="relative">
                <Navbar style={{ background: 'blue' }} />
                <Box id="main-content" flexGrow={1} pb="50px">
                    <Container maxWidth="xxl">
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </Container>
                </Box>
            </Box>
            <Footer />
        </div>
    );
};

export default LayoutAuth;
