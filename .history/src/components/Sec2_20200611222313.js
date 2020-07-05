import React from 'react';
import Button from '@material-ui/core/Button'
import Users from '../components/Users';
//import { Button} from 'react-bootstrap';
const sec1 = (props)=>{
    const styles={
        bgstyle: {backgroundColor: "grey",  textAlign:"left",},
        title: {fontSize: "1rem",color:"white",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "28.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
             <Button style={{backgroundColor:'blue', color:'white' , float:"right"}}>
                Predict
              </Button>
        <h1 style={styles.title}>{props.heading}</h1>
        <Users syt/>
        
        
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default sec1;

