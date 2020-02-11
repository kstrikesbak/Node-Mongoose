const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
// const bcrypt = require('bcryptjs')
const User = require('./models/Users')
// const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => console.log(`Mongo Error: ${err}`));



const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/users', userRoutes);


// app.get('/getAllUsers', (req, res) => {
//     User.find({}).then(users => res.json(users));
// });

// app.post('/login', (req,res) => {
//     return new Promise((resolve,reject) => {
//         User.findOne({email:req.body.email})
//         .then((user) => {
//             bcrypt.compare(req.body.password, user.password)
//             .then((user) => {
//                 return res.send(user=== true ? 'you are logged in' : 'incorrect credentials');
//             })
//             .catch(err => {
//                 return res.status(500).json({message: 'Server error', err})
//             })
//             // const passwordMatch = user.password === req.body.password ? true : false;
//             // if (!passwordMatch) {
//             //     return res.status(400).json({message: 'Incorrect email or password'});
//             // } else {
//             //     res.status(200).json({message: `You are now logged in ${user.email}`});
//             //     resolve(user);
//             // }
//         })
//         .catch(err => reject(err));
//     });
// });

// app.put('/update/:id', (req, res) => {
//     return new Promise((resolve, reject) => {
//             User.findById({ _id: req.params.id})
//             .then((user) => {
//                 const { name, email} = req.body;

//                 user.name = name ? name : user.name;
//                 user.email = email ? email : user.email;

//                 user
//                 .save()
//                 .then((user) => {
//                     return res.status(200).json({message: "User updated", user});
//                 })
//                 .catch(err => reject(err));
//             })
//             .catch(err => res.status(500).json({message: 'Server Error', err}));
//         });
// });

// app.delete('/delete/:id', (req,res) => {
    
//     return new Promise ((resolve, reject) => {

//         User.findByIdAndDelete({ _id: req.params.id })
//         .then(user => {
//             return res.status(200).json({message: 'User Deleted', user});
//         })
//         .catch(err => res.status(400).json({message: 'No user to delete'}));
//     });
// });

// app.post('/register', (req, res) => {
//     return new Promise((resolve, reject) => {
//         const { name, email, password} = req.body;

//         // validate input
//         //name is actually req.body.email below is just shortcut

//         if (name.length === 0 || email.length === 0 || password.length === 0) {
//             return res.json({message: 'All fields must be completed' })
//         }
// //check if user exists
// //findOne is a query from mongoose
//         User.findOne({ email: req.body.email })

//         //or just 'email' instead of 'req.body.email' above
//         .then(user => {
//             if(user){
//                 return res.status(403).json({message: 'User Already Exists'});
//             }
//             const newUser = new User();
//             //name is actually req.body.email below is just shortcut
//             const salt = bcrypt.genSaltSync(10);
//             const hash = bcrypt.hashSync(req.body.password, salt);

//             newUser.name = name;
//             newUser.email = email;
//             newUser.password = hash;

//             newUser
//                 .save()
//                 .then((user) => {
//                     res.status(200).json({ message: 'User Created', user });
//                 })
//                 .catch(err => {
//                     reject(err);
//                 });

//         }).catch(err=>{
//             console.log(err)
//         });
//     });
// });

// app.post('/login', (req,res) => {
//     return new Promise((resolve,reject) => {
//         User.findOne({email:req.body.email})
//         .then((user) => {
//             const passwordMatch = user.password === req.body.password ? true : false;
//             if (!passwordMatch) {
//                 return res.status(400).json({message: 'Incorrect email or password'});
//             } else {
//                 res.status(200).json({message: `You are now logged in ${user.email}`});
//                 resolve(user);
//             }
//         })
//         .catch(err => reject(err));
//     });
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
