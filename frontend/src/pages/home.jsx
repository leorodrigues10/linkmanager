import React from 'react'
import {useAuth} from '../hooks/useAuth'
import {Box, Button, Container, Grid, Paper, Stack} from "@mui/material";
import Header from "../components/Header";
import Form from '../components/Form';
import StickyHeadTable from "../components/Table";
import Crawl from "../components/Form/Crawl";
import Log from '../components/Logs'
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));

function Home() {
    const {isAuthenticated} = useAuth()
    return (
        <Box sx={{height: '100%'}}>
            <Header/>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}
                  sx={{height: '94%', background: '#F2f2f2', p: 2}}>
                <Grid item xs={8} sx={{height: '100%', pl: 2}}>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 2, sm: 2, md: 3}}
                          sx={{height: '98%'}}>
                        <Grid item xs={6} sx={{height: '55%'}}>
                            <Item>
                                <Form/>
                            </Item>
                        </Grid>
                        <Grid item xs={6} sx={{height: '55%'}}>
                            <Item>
                                <Crawl />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sx={{height: '44%', mt: 2}}>
                            <Item>
                                <Log />
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} sx={{height: '100%'}}>
                    <StickyHeadTable/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home