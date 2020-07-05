import React from 'react';

const Ltop = (props)=>{
    const styles={
        bgstyle: {backgroundColor: "grey",  textAlign:"left"},
        title: {fontSize: "1rem",color:"white",fontWeight: 'normal',paddingTop:".002rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "12.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
        <h1 style={styles.title}>{props.heading}</h1>
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default Ltop;
