const express =require('express');
const ideasRouter=express.Router();

const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
  }  =  require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
  

  ideasRouter.get('/',(req,res,next)=>{
   let ideas=getAllFromDatabase('ideas');
   if(ideas)
   {
     console.log(typeof(ideas));
     res.send(ideas);
   }
   else{
     res.status(404).send();
   }
 });
 
 
 ideasRouter.get('/:ideaId',(req,res,next)=>{
   
   let ideaid=req.params.ideaId;
   let ideabyid=getFromDatabaseById('ideas', ideaid);
   if(ideabyid)
   {
     res.send(ideabyid);
   }
   else{
     res.status(404).send();
   }
 
 });
 ideasRouter.post('/',checkMillionDollarIdea,(req,res,next)=>{
 
    let newidea={
      name: req.body.name,
      description: req.body.description,
      weeklyRevenue: req.body.weeklyRevenue,
      numWeeks: req.body.numWeeks
    };
  
    let addedidea=addToDatabase('ideas',req.body);
    if(addedidea)
    {
      res.status(201).send(addedidea);
    }
    else{
      res.status(400).send();
    }
  
  });

 
 ideasRouter.put('/:ideaId',(req,res,next)=>{
 
   let ideaid=req.params.ideaId;
   let updatedidea=updateInstanceInDatabase('ideas',req.body);
   if(updatedidea)
   {
     res.send(updatedidea);
   }
   else{
     res.status(404).send();
   }
 
 });
 
 
 ideasRouter.delete('/:ideaId',(req,res,next)=>{

   let deletedidea=deleteFromDatabasebyId('ideas',req.params.ideaId);
   if(deletedidea)
   {
     res.status(204).send();
   }
   else{
     res.status(404).send();
   }
});

module.exports=ideasRouter;