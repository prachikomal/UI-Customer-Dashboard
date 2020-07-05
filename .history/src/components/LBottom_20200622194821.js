
import Table2 from '../components/Table2';
import React from 'react';
import { Paper } from '@material-ui/core';
import theme from '../utils/theme';
const Lbottom = (props)=>{
    const styles={
        scroll: {
            
            width: '100%',
            height:'55vh',
            marginTop: theme.spacing.unit * 2,
            overflow: 'auto',
            
            
        },
        bgstyle: {backgroundColor: "grey",  textAlign:"left"},
        title: {fontSize: "1.4rem",color:"rgba(255,255,255,.8)",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "12.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>

        
        <h1 style={styles.title}>{props.heading}</h1>
        
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default Lbottom;
