import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Marquee from "react-fast-marquee";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from "@mui/material/Stack";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
    return (
        // <ThemeProvider theme={defaultTheme}>
        //     <Box
        //         sx={{
        //             display: 'flex',
        //             flexDirection: 'column',
        //             minHeight: '100vh',
        //         }}
        //     >
                <Box
                    component="footer"
                    sx={{
                        position: 'fixed',
                        zIndex: 1,
                        width: '100%',
                        py: 1,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    {/*<Container maxWidth="sm">*/}
                        {/*<Box*/}
                        {/*    sx={{*/}
                        {/*        flexDirection: 'column',*/}
                        {/*        width: '10%',*/}
                        {/*        maxWidth: 500,*/}
                        {/*    }}*/}
                        {/*>*/}
                            <Marquee>
                                <Stack spacing={3} direction={"row"} sx={{alignSelf: "center", mx: 2}} >
                                    <img src={"static/images/logo_yu.jpg"} width={70}/>
                                    <h1>Theo dõi Fanpage Tuổi trẻ Trường Đại học Công nghệ Thông tin và Truyền thông
                                        Việt - Hàn hoặc liên hệ 0236.3667.191 để để biết về thời gian nhận áo!!</h1>
                                </Stack>
                            </Marquee>
                    {/*</Box>*/}
                    {/*</Container>*/}
                </Box>
        // </Box>
        // </ThemeProvider>
    );
}