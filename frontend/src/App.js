import {Box, Grid, Typography} from "@mui/material";
import Header from "./components/Header";
import GridItem from "./components/GridItem";
import Form from "./components/Form";
import StickyHeadTable from "./components/Table";


function App() {
    return (
        <Box sx={{height: "100vh", background: "#F2f2f2"}}>
            <Header/>
            <Grid container alignItems='center' spacing={2} sx={{px: 10, py: 5}}>
                <Grid item xs={12} lg={3}>
                    <Form/>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Box padding={2}>
                        <Typography variant="h5">List my links</Typography>
                        <StickyHeadTable/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
