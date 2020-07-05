import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from "../assets/FredaButton.png";
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Send from "../assets/send-24px.svg"



export default function BOTscreen() {
  
  const [open, setOpen] = React.useState(false);
  const Ui=(data,type)=>{
    if(type===0){

      var text = document.createElement("LI");
      text.innerHTML = data;
      text.style.fontSize=".8rem";
      text.style.margin="16px";
      text.style.listStyleType="none";
      text.style.justifyContent="flex-end";
      text.style.display="flex";
      text.style.color="white";
      document.getElementById("chat").appendChild(text);
    }else{
      
      var para = document.createElement("LI");
      text.innerHTML = data;
      text.style.fontSize=".8rem";
      text.style.margin="16px";
      text.style.maxWidth="60%";
      text.style.justifyContent="flex-start";
      text.style.display="flex";
      text.style.listStyleType="none";
      text.style.left="4px";
      text.style.color="white";
      document.getElementById("chat").appendChild(text);
    }
  }



  const componentDidMount=()=>{
    const inputval=document.getElementById("input").value.trim();
    document.getElementById("input").value="";
    Ui(inputval,0);


    axios({
      method: 'post',
      url: 'http://localhost:4000/chat',
      data: {
        autoid:"human",
        message: inputval,        
      }
    }).then((response) => {
      Ui(response.data.message,1);
      autoid="ai",
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

  
   


  return (
    <div >
        <img autoid="professor-button" onClick={handleOpen} src={Image} alt="Freda" style={{width: "80%",marginRight:"-3.5rem", cursor:"pointer"}}></img>
      <Modal
        open={open}
        hideBackdrop={true}
       
>
<div  style={{height: "94%",backgroundColor:"rgba(27,31,56,1)",borderLeft: "1px solid orange",borderTop: "1px solid orange", width:"300px", zIndex:5,position:"absolute",right:"0px",bottom:"0px",overflow:"hidden"}}> 
    <h1 style={{color:"white", fontSize: "1rem", padding:"8px",fontWeight:"normal"}}>PROFESSOR</h1>
    
    <span autoid="professor-close-button" style={{color:"white", position:"absolute", right: "16px", top:"16px", fontWeight:"bold", cursor:"pointer"}} onClick={handleClose}>X</span>
   
    <div id="chat" style={{display:"flex",flexDirection:"column",width:"95%",height:"75%", padding:"8px", position:"relative", overflowY:"auto", overflowX:"hidden"}}>

    </div>
    <input  autoid="professor-input-box" id="input" type="text" style={{width: "90%",position:"relative",marginTop:".5rem",marginLeft:"5%",border: "1px solid #00c0ff", borderRadius:"20px",
 fontSize:".8rem", padding: "8px", backgroundColor: "rgba(27,31,56,.9)", color: "white", 
 }} placeholder="Ask me..."> 
 </input>
 <img autoid="professor-send-button" onClick={componentDidMount} src={Send} alt="Send" style={{width: "8%", position:"absolute", right:"8px", bottom:"24px", cursor:"pointer"}}></img>

  </div>
      </Modal>
    </div>
  );
}