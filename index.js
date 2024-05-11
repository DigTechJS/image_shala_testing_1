const express=require("express");
const multer = require('multer');
const path = require('path');
const connectDB=require('./db/index.js')
const bcrypt=require("bcryptjs")
const User=require('./models/User.js')
const CommunityImages=require('./models/communityImages.js')
const sendMail=require('./utils/sendMail.js')
const fs=require('fs')
const folderPath='./public/images/'
const Feedback=require('./models/feedback.js')
const salt = bcrypt.genSaltSync(10);
const applyWatermark=require('./utils/applyWatermark.js')
const randString=require('./utils/randomString.js')
const sendRegisterMail=require('./utils/sendRegisterMail.js')
let loggedIn=false;

const cloudinary = require('cloudinary').v2;
const port=process.env.PORT;
require('dotenv').config();
cloudinary.config({ 
    cloud_name: 'dfwfvo0eo', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const storage = multer.diskStorage({
    destination: './public/uploads/', // Set the destination folder for uploads
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
      }
    }
);
const upload = multer({ storage: storage });
  


const app=express();

app.use('/public',express.static('public'))
app.use(express.json())
app.use(express.urlencoded()) 
try{
    connectDB();
}
catch(e){
    console.log(e)
    res.status(400).json(e);
}


app.get('/', function(req, res) {
    // res.status(200).sendFile(path.join(__dirname, '/src/index.html'));
});
app.get('/login', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/src/login.html'));
});
app.get('/register', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/src/register.html'));
});
app.get('/home', function(req, res) {
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/home.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
});
app.get('/generate', function(req, res) {
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/generateImage.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, 'src/index.html'));

    }
});
app.get('/community', function(req, res) {
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/community.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, 'src/index.html'));

    }
});

app.get('/library', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})

app.get('/library/animals', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library/animals.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})

app.get('/feedback', async(req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/feedback.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/shareWithCommunity', async(req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/shareWithCommunity.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})



app.get('/library/beaches', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library/beaches.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/library/festivals', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library/festivals.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/library/foods', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library/foods.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/library/forests', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library/forests.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/library/mountains', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/library/mountains.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})

app.get('/othersfeedback', function(req, res){
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/othersfeedback.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})

app.get('/logout', (req,res)=>{
    loggedIn=false;
    res.redirect('/');
})

app.get('/blogs', (req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/blogs.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})

app.get('/blogs/1', (req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/blogs/1.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/blogs/2', (req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/blogs/2.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/blogs/3', (req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/blogs/3.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})
app.get('/blogs/4', (req,res)=>{
    if(loggedIn){
        res.status(200).sendFile(path.join(__dirname, '/src/blogs/4.html'));
    }
    else{
        res.status(200).sendFile(path.join(__dirname, '/src/index.html'));

    }
})


app.post('/registration',async (req,res)=>{
    const {username,password,email}=req.body;
    // console.log(req.body.json())
    try{
        const findUser=await User.findOne({username,email})
        console.log(findUser);
        if(findUser){
            throw new Error("user already exist.")   
        }
        const uniqueString=randString(username);
        const isValid=false;
        const myData=new User({
            username, password:bcrypt.hashSync(password,salt),email,uniqueString,isValid
        })
        await myData.save()
          sendRegisterMail(email,uniqueString);
          res.status(200).json(myData);
      }
      catch(e){
        console.log(e)
        res.status(400).json(e);
      }
})


app.get('/verify/:uniqueString', async (req, res) => {  
    //getting the string  
    const { uniqueString } = req.params  
    //check is there is anyone with this string  
    const user = await User.findOne({ uniqueString: uniqueString })  
    if (user) {  
        //if there is anyone, mark them verified  
        user.isValid = true  
        await user.save()  
        //redirect to the home or anywhere else  
        res.redirect('/')  
    } else {  
        //else send an error message  
        res.json('User not found')  
    }  
})



app.post('/generateImage', async (req, res) => { 
  const filePath1 = folderPath+'image.jpg';
  const filePath2 = folderPath+'finalImage.jpg';
  const { prompt } = req.body;
  const form = new FormData();
  form.append('prompt', prompt);

  try {
     fs.access(filePath1, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist or you don't have permission to access it
            console.error('File does not exist or cannot be accessed.');
            return;
        }
    
        // File exists, so delete it
         fs.unlink(filePath1, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.log('File deleted successfully');
        });
    });
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY,
      },
      body: form,
    });
    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }
    
    

    const buffer = await response.arrayBuffer();
     
    await fs.writeFile(filePath1, Buffer.from(buffer), (err) => {
      if (err) {
        console.error('Error saving image:', err);
        res.status(500).json({ error: 'Error saving image' });
      } else {
        console.log('Image saved successfully!');
        res.status(200).json({ message: 'Image saved successfully' });
      }
    });
    // try{

        await applyWatermark(filePath1,folderPath+'watermark.png',filePath2);
    // }
    // catch(e){
    //     res.status(500).json({ error: 'Watermark can not be applied.' });
    // }
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Error fetching image' });
  }
});


app.post('/loginpost',async (req,res)=>{
    const {username, password}=req.body;
//   console.log(req.body);
  const findUser=await User.findOne({username})

  try {
    if(!findUser.isValid){
        res.status(400).send('Please Verify email')
        return;
    }
    const pass=bcrypt.compareSync(password,findUser.password);
    if(pass){
      //loggedin
      res.status(200).send('ok');
      loggedIn=true;
    }
    else{
      res.status(400).send('wrong credentials');
    }
  
  } catch (error) {
    res.status(400).send(`Cannot Find User`);
  }
})

app.post('/shareCommunity',async (req,res)=>{
   
    const directoryPath = './public/images/image.jpg';
    const {prompt}=req.body;
    try {
        const img=await cloudinary.uploader.upload(directoryPath, function(error, result) {
            if (error) {
              console.error(error);
            } else {
              console.log(result.url); // The URL of the uploaded image on Cloudinary
            }
          });
        
        // console.log(imgURL);
        const imagelink=img.url;
        const myData=new CommunityImages({imagelink, prompt});
        await myData.save();
        
        res.status(200).json({
            prompt, imagelink

        });
        
    } catch (error) {
        res.status(400).send(error);
    }
    
})

app.post('/showImages', async (req,res)=>{
    try{
        const result=await CommunityImages.find({});
        // console.log(result);
        res.status(200).json({result:result});

    }
    catch(error){
        res.status(400).json({message:error});
    }
})

app.post('/saveFeedback', async(req,res)=>{
    // console.log("PAPA")
    const {name,email,phone,feedbackmessage,rating}=req.body;
    console.log(name)
    try{
        console.log(req.body)
        const myData=new Feedback({
            name,
            email,phone,feedbackmessage,rating
        })
        await myData.save();
        await sendMail(email)
        res.status(200).json(myData);

    }
    catch(error){
        console.log(error)
        res.status(400).json(error);
    }


})

app.post('/sendFeedbacks',async(req,res)=>{
    try{
        console.log("hi")
        const result=await Feedback.find({});
        res.status(200).json({result:result
        });
    }
    catch(error){
        res.status(400).json({message:error})
    }
})


app.post('/saveImages',upload.single('image'), async (req,res)=>{
    const {prompt}=req.body;
    console.log(prompt)
    console.log(req.file.filename);
    
    const directoryPath='./public/uploads/'+req.file.filename;
    try {
        const img=await cloudinary.uploader.upload(directoryPath, function(error, result) {
            if (error) {
              console.error(error);
            } else {
              console.log(result.url); // The URL of the uploaded image on Cloudinary
            }
          });
        
        // console.log(imgURL);
        const imagelink=img.url;
        const myData=new CommunityImages({imagelink, prompt});
        await myData.save();
        fs.unlink(directoryPath, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Image deleted successfully")
            }
        })
        
        res.status(200).json({
            prompt, imagelink

        });
        
    } catch (error) {
        res.status(400).send(error);
    }

})





app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}/`);
})