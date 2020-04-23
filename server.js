const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const {createMeeting,
  createWork,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase
}  =  require('./server/db');

module.exports = app;

app.use(cors());

app.use(bodyParser.json());
/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api',apiRouter);

apiRouter.get('/minions',(req,res,next)=>{
   let minionarray=getAllFromDatabase('minions');
   if(minionarray)
   {
     res.send(minionarray);
   }
   else{
     res.status(404).send();
   }

});

apiRouter.post('/minions',(req,res,next)=>{

  let newminion={
    id:req.body.id,
    name:req.body.name,
    title:req.body.title,
    weakness:req.body.weakness,
    salary:req.body.salary
  };

  let addedminion=addToDatabase('minions',newminion);
  if(addedminion)
  {
    res.status(201).send(addedminion);
  }
  else{
    res.status(400).send();
  }

});


apiRouter.get('/minions/:minionId',(req,res,next)=>{
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

apiRouter.put('/minions/:minionId',(req,res,next)=>{
  let minionid=req.params.minionId;
  let minionbyid=getFromDatabaseById('minions', minionid);
  let updatedminion=updateInstanceInDatabase('minions',minionbyid);
  if(updatedminion)
  {
    res.send(updatedminion);
  }
  else{
    res.status(404).send();
  }
});


apiRouter.delete('/minions/:minionId',(req,res,next)=>{
  let minionid=req.params.minionId;
  let minionbyid=getFromDatabaseById('minions', minionid);
  let deletedminion=deleteFromDatabasebyId('minions',minionbyid);
  if(deletedminion)
  {
    res.status(204).send();
  }
  else{
    res.status(404).send();
  }

});



apiRouter.get('/ideas',(req,res,next)=>{
  let ideas=getAllFromDatabase('ideas');
  if(ideas)
  {
    res.send(ideas);
  }
  else{
    res.status(404).send();
  }
});


apiRouter.get('/ideas/:id',(req,res,next)=>{
  
  let ideaid=req.params.minionId;
  let ideabyid=getFromDatabaseById('ideas', ideaid);
  if(ideabyid)
  {
    res.send(ideabyid);
  }
  else{
    res.status(404).send();
  }

});


apiRouter.put('/ideas/:ideaId',(req,res,next)=>{

  let ideaid=req.params.ideaId;
  let ideabyid=getFromDatabaseById('ideas', ideaid);
  let updatedidea=updateInstanceInDatabase('ideas',ideabyid);
  if(updatedidea)
  {
    res.send(updatedidea);
  }
  else{
    res.status(404).send();
  }

});


apiRouter.delete('/ideas/:ideaId',(req,res,next)=>{
  let ideaid=req.params.ideaId;
  let ideabyid=getFromDatabaseById('ideas', ideaid);
  let deletedidea=deleteFromDatabasebyId('ideas',ideabyid);
  if(deletedidea)
  {
    res.status(204).send();
  }
  else{
    res.status(404).send();
  }

});


apiRouter.get('/meetings',(req,res,next)=>{
  let meetings=getAllFromDatabase('meetings');
  if(meetings)
  {
    res.send(meetings);
  }
  else{
    res.status(404).send();
  }
});


apiRouter.post('/meetings',(req,res,next)=>{

  let addedmeeting=addToDatabase('meetings',createMeeting);
  if(addedmeeting)
  {
    res.status(201).send(addedmeeting);
  }
  else{
    res.status(400).send();
  }
});


apiRouter.delete('/meetings',(req,res,next)=>{
  let deletedmeetings=deleteAllFromDatabase('meetings');
  if(deletedmeetings===[])
  {
    res.status(204).send();
  }
  else{
    res.status(404).send();
  }
});

apiRouter.get('/minions/:minionId/work',(req,res,next)=>{
  let minionid=req.params.minionId;
  let workarray=getAllFromDatabase('work').filter(work=>{
    return work.minionId===req.params.minionId;
  });
  if(workarray)
  {
    res.send(workarray);
  }
  else{
    res.status(404).send();
  }
});

apiRouter.post('/minions/:minionId/work',(req,res,next)=>{
  let minionid=req.params.minionId;
  let work=createWork(minionid);
  let added=addToDatabase('work',work);
  if(added)
  {
    res.status(201).send(work);
  }
  else{
    res.status(400).send();
  }

});

apiRouter.put('/minions/:minionId/work/:workId',(req,res,next)=>{

  let update=updateInstanceInDatabase('work',req.body);
  if(req.params.minionId!==update.minionId)
  {
    res.status(404).send();
  
  }
  else{
    res.send(update);
  }
});


apiRouter.delete('/minions/:minionId/work/:workId',(req,res,next)=>{
  let workid=req.params.workId;
  let deletedwork=deleteFromDatabasebyId('work',workid);
  if(deletedwork)
  {
    res.status(204).send();
  }
  else if(deletedwork.minionId===req.params.minionId){
    res.status(500).send();
  }
});

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
});
}
