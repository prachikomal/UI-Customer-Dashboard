import React from 'react';
import Button from '@material-ui/core/Button'
import Users from '../components/Users';
import theme from '../utils/theme';
import { Paper } from '@material-ui/core';
//import { Button} from 'react-bootstrap';
const sec1 = (props)=>{
    const styles={
        scroll: {
            
            width: '100%',
            height:'65vh',
           
            overflow:"auto",
         },
        bgstyle: {backgroundColor: "rgba(27,31,56,.85)",  textAlign:"left",},
        title: {fontSize: "1rem",color:"white",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "28.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
        
           
              
        <h1 style={styles.title}>{props.heading}</h1>
        <div>
        <Paper style={styles.scroll}>
        table class which is to be displayed
        </Paper>
        </div>
        
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default sec1;

