import React from 'react';
import Button from '@material-ui/core/Button'
import Users from '../components/Users';
import theme from '../utils/theme';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
const sec1 = (props)=>{
    const styles={
        scroll: {
            
            width: '100%',
            height:'65vh',
            marginTop: theme.spacing.unit * 15,
            overflow:"auto",
         },
        bgstyle: {backgroundColor: "rgba(27,31,56,.85)",  textAlign:"left",},
        title: {fontSize: "1rem",color:"white",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "28.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
        
            
              <Grid item >
              <Button variant="outlined" style={{ color:'white' , float:"left",position:'relative',bottom:'-60px'}}>
                MODIFY
              </Button>
              <Button variant="outlined" style={{ color:'white' , float:"left",position:'relative',bottom:'-60px'}}>
                EXPORT
              </Button>
              
              </Grid>
              <Grid item xs={3}>
          <Paper><Sec1 heading="Total Customer" value="2091"/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper><Sec1 heading="Total Open AR" value="$43M"/></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper><Sec1 heading="Average Days Delay" value="3 Days"/></Paper>
        </Grid>
              
        <h1 style={styles.title}>{props.heading}</h1>
        <div>
        <Paper style={styles.scroll}>
        <Users />
        </Paper>
        </div>
        
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default sec1;

