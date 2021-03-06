import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from "../assets/FredaButton.png";
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Send from "../assets/send-24px.svg"



export default function SimpleModal() {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const createUi=(data,type)=>{
    if(type===0){
      var para = document.createElement("LI");
      para.innerHTML = data;
      para.style.fontSize=".8rem";
      para.style.margin="16px";
      para.style.listStyleType="none";
      para.style.justifyContent="flex-end";
      para.style.display="flex";
      para.style.color="white";
      document.getElementById("chat").appendChild(para);
    }else{
      var para = document.createElement("LI");
      para.innerHTML = data;
      para.style.fontSize=".8rem";
      para.style.margin="16px";
      para.style.maxWidth="60%";
      para.style.justifyContent="flex-start";
      para.style.display="flex";
      para.style.listStyleType="none";
      para.style.left="4px";
      para.style.color="white";
      document.getElementById("chat").appendChild(para);
    }
  }



  const componentDidMount=()=>{
    const inputval=document.getElementById("input").value.trim();
    document.getElementById("input").value="";
    createUi(inputval,0);


    axios({
      method: 'post',
      url: 'http://localhost:4000/chat',
      data: {
        message: inputval,        
      }
    }).then((response) => {
      createUi(response.data.message,1);
      
    }, (error) => {
      console.log(error);
    });
   
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div   id="cross" style={{height: "94%",backgroundColor:"rgba(27,31,56,1)",borderLeft: "1px solid orange",borderTop: "1px solid orange", width:"300px", zIndex:5,position:"absolute",right:"0px",bottom:"0px",overflow:"hidden"}}> 
    <h1 style={{color:"rgba(255,255,255,.8)", fontSize: "1rem", padding:"8px",fontWeight:"normal"}}>PROFESSOR</h1>
    <span style={{color:"white", position:"absolute", right: "40px", top:"2px", fontWeight:"bold", cursor:"pointer",fontSize:"2rem"}}>-</span>
    <span style={{color:"white", position:"absolute", right: "16px", top:"16px", fontWeight:"bold", cursor:"pointer"}} onClick={handleClose}>X</span>
   
    <div id="chat" style={{display:"flex",flexDirection:"column",width:"95%",height:"75%", padding:"8px", position:"relative", overflowY:"auto", overflowX:"hidden"}}>

    </div>
    <input id="input" type="text" style={{width: "90%",position:"relative",marginTop:".5rem",marginLeft:"5%",marginLeft: "8px",border: "1px solid #00c0ff", borderRadius:"20px",
 fontSize:".8rem", padding: "8px", backgroundColor: "rgba(27,31,56,.9)", color: "white", 
 }} placeholder="Type here..."> 
 </input>
 <img onClick={componentDidMount} src={Send} alt="Send" style={{width: "8%", position:"absolute", right:"8px", bottom:"24px", cursor:"pointer"}}></img>

  </div>
  );

  return (
    <div >
        <img onClick={handleOpen} src={Image} alt="Freda" style={{width: "30%", marginTop: "-.5rem",marginRight:"-3rem", cursor:"pointer"}}></img>
      <Modal
        open={open}
        hideBackdrop={true}
        disableAutoFocus={true}
        onBackdropClick={true}
>
        {body}
      </Modal>
    </div>
  );
}