const express =require('express');
const meetingsRouter=express.Router();

const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
  }  =  require('./db');


  
 meetingsRouter.get('/',(req,res,next)=>{
    let allmeetings=getAllFromDatabase('meetings');
    if(allmeetings)
    {
      res.status(200).send(allmeetings);
    }
    else{
      
      res.status(404).send();
    }
  });
  
  
  meetingsRouter.post('/',(req,res,next)=>{
  
    let addedmeeting=addToDatabase('meetings',createMeeting());
    if(addedmeeting)
    {
      res.status(201).send(addedmeeting);
    }
    else{
      res.status(400).send();
    }
  });
  
  
  meetingsRouter.delete('/',(req,res,next)=>{
    let deletedmeetings=deleteAllFromDatabase('meetings');
    if(deletedmeetings.length===0)
    {
     
      res.status(204).send();
    }
    else{
      
      res.status(404).send();
    }
  });
  
  module.exports=meetingsRouter;