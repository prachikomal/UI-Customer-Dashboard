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
            marginTop: theme.spacing.unit * ,
            overflow:"auto",
         },
        bgstyle: {backgroundColor: "rgba(27,31,56,.85)",  textAlign:"left",},
        title: {fontSize: "1rem",color:"white",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "28.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
        <div>
             <Button variant="outlined" style={{ color:'white' , float:"left"}}>
                MODIFY
              </Button>
              <Button variant="outlined" style={{ color:'white' , float:"left"}}>
                EXPORT
              </Button>
              </div>
        <h1 style={styles.title}>{props.heading}</h1>
        <Paper style={styles.scroll}>
        <Users />
        </Paper>
        
        
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default sec1;

