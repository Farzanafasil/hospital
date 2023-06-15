const express=require('express');
const router=express.Router();
const app=new express();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
const fs = require('fs');
const readData = () => {
    const data = fs.readFileSync('hospital.json');
    return JSON.parse(data);
  };
  const writeData = (data) => {
    fs.writeFileSync('hospital.json', JSON.stringify(data));
  };
router.get('/',(req,res)=>{
    // res.send('Hi, this is Get Request');
    // res.send(arr1);
    const hospitals = readData();
    res.send(hospitals);
})
router.post('/addhospital',(req,res)=>{
    console.log(req.body);
    const hospitals = readData();
    const newHospital = req.body; // Assuming you're using body-parser middleware for parsing JSON body
    hospitals.push(newHospital);
    writeData(hospitals);
    res.send(hospitals);
})
router.put('/hospitals/:id', (req, res) => {
    const hospitals = readData();
    const updatedHospital = req.body; // Assuming you're using body-parser middleware for parsing JSON body
    const hospitalIndex = hospitals.findIndex((hospital) => hospital.id === req.params.id);
    if (hospitalIndex !== -1) {
      hospitals[hospitalIndex] = updatedHospital;
      writeData(hospitals);
   
     res.send(updatedHospital);
      
      
      
    } else {
      res.status(404).json({ error: 'Hospital not found' });
    }
  });
  router.delete('/hospitalsdelete/:id', (req, res) => {
    const hospitals = readData();
    const hospitalIndex = hospitals.findIndex((hospital) => hospital.id === req.params.id);
    if (hospitalIndex !== -1) {
      const deletedHospital = hospitals.splice(hospitalIndex, 1)[0];
      writeData(hospitals);
      res.send(deletedHospital);
    }
    });
module.exports=router;