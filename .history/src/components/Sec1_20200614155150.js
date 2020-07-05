import React from 'react';

const sec1 = (props)=>{
    const styles={
        bgstyle: {,  textAlign:"center"},
        title: {fontSize: "1.5rem",color:"white",fontWeight: 'normal',paddingTop:"1.2rem"},
 title2: {fontSize: "1.5rem",color:"white",paddingBottom: "1.2rem", fontWeight: 'bold'},

 }
    return <div style={styles.bgstyle}>
        <h1 style={styles.title}>{props.heading}</h1>
        <h1 style={styles.title2}>{props.value}</h1>
    </div>
}

export default sec1;

