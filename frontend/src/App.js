import {Box, Grid, Typography} from "@mui/material";
import Header from "./components/Header";
import GridItem from "./components/GridItem";
import Form from "./components/Form";
import StickyHeadTable from "./components/Table";
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/authContext'
import Router from './routes'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
