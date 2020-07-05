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
            height:'55vh',
            marginTop: theme.spacing.unit * 2,
            overflow:"auto",
         },
        bgstyle: {backgroundColor: "grey",  textAlign:"left",},
        title: {fontSize: "1rem",color:"white",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "28.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
             
    </div>
}

export default sec1;

