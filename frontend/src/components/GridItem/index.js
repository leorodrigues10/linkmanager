import { Grid, Paper, styled } from "@mui/material";
import React from "react";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  }));

function GridItem({ children }) {
  return (
    <Grid item xs={12} md={6}>
       {children}
    </Grid>
  );
}

export default GridItem;
