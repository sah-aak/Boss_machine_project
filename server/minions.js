const express =require('express');
const minionsRouter=express.Router();

const {createMeeting,
    createWork,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
  }  =  require('./db');
  

minionsRouter.get('/',(req,res,next)=>{
    let minionarray=getAllFromDatabase('minions');
    if(minionarray)
    {
      res.send(minionarray);
    }
    else{
      res.status(404).send();
    }
 
 });
 
 minionsRouter.post('/',(req,res,next)=>{
  
   let addedminion=addToDatabase('minions',req.body);
   if(addedminion)
   {
     res.status(201).send(addedminion);
   }
   else{
     res.status(400).send();
   }
 
 });
 
 
 minionsRouter.get('/:minionId',(req,res,next)=>{
   let minionid=req.params.minionId;
   let minionbyid=getFromDatabaseById('minions', minionid);
   if(minionbyid)
   {
     res.send(minionbyid);
   }
   else{
     res.status(404).send();
   }
 });
 
 minionsRouter.put('/:minionId',(req,res,next)=>{
   
   let updatedminion=updateInstanceInDatabase('minions',req.body);
   if(updatedminion)
   {
     res.send(updatedminion);
   }
   else{
     res.status(404).send();
   }
 });
 
 
 minionsRouter.delete('/:minionId',(req,res,next)=>{
   let minionid=req.params.minionId;
   let deletedminion=deleteFromDatabasebyId('minions',minionid);
   if(deletedminion)
   {
     res.status(204).send();
   }
   else{
     res.status(404).send();
   }
 
 });

 minionsRouter.get('/:minionId/work',(req,res,next)=>{
    if(!Number(req.params.minionId)){
      res.status(404).send();
    }
     let workarray=getAllFromDatabase('work').filter(work=>{
       return work.minionId===req.params.minionId;
     });
     if(workarray.length===0)
     {
       res.status(404).send();
     }
     else{
       res.send(workarray);
     }
   });
   
   minionsRouter.post('/:minionId/work',(req,res,next)=>{
     let work=req.body;
     work.minionId = req.params.minionId;
     let added=addToDatabase('work',work);
     if(added)
     {
       res.status(201).send(work);
     }
     else{
       res.status(400).send();
     }
   
   });
   
   minionsRouter.put('/:minionId/work/:workId',(req,res,next)=>{
   
     let reqItem=getFromDatabaseById('work',req.params.workId);
     if(!reqItem||!Number(req.params.workId)){
      res.status(404).send();
     }
     else if((reqItem.minionId!==req.params.minionId))
     {
       res.status(400).send();
     }
     else{
       let update=updateInstanceInDatabase('work',req.body);
       res.send(update);
     }
   });
   
   
   minionsRouter.delete('/:minionId/work/:workId',(req,res,next)=>{
     let workid=req.params.workId;
     let work=getFromDatabaseById('work',workid);
     
     if(!work||(work.minionId!==req.params.minionId)){
       res.status(404).send();
     }
     else
     {
      let deletedwork=deleteFromDatabasebyId('work',workid);
      if(deletedwork)
        res.status(204).send();
      else
        res.status(404).send();
     }
   });
  
  
  
 
 module.exports=minionsRouter;

