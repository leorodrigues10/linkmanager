import React from 'react'
import { Link } from 'react-router-dom'
import {Typography, TextField, Grid, Paper, Stack, Button} from '@mui/material'
import {styled} from '@mui/material/styles'

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Register() {
    return (

        <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{
                height: '100%',
                background: '#f2f2f2'
            }}>
            <Grid item xs={10} sm={7} md={4} lg={3}>
                <Item>
                    <form>
                        <h2>Registe-se</h2>
                        <Stack spacing={2} sx={{mt: 2}}>
                            <TextField  fullWidth label='Utilizador' variant='filled'/>
                            <TextField  fullWidth label='Email' variant='filled'/>
                            <TextField fullWidth label='Senha' variant='filled'/>
                            <TextField fullWidth label='Confirmar senha' variant='filled'/>
                            <Button>
                                Registar
                            </Button>
                        </Stack>
                        <Typography sx={{m: 1}}>
                            Tem uma conta? <Link to='/auth/login'>Login</Link>
                         </Typography>
                    </form>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Register