const User = require('../models/Users');
const bcrypt = require('bcryptjs');


module.exports = {
    getAllUsers: (req, res) => {
        User.find({}).then(users => res.json(users));
    },
    register: (req, res) => {
        return new Promise((resolve, reject) => {
            const { name, email, password} = req.body;
    
            // validate input
            //name is actually req.body.email below is just shortcut
    
            if (name.length === 0 || email.length === 0 || password.length === 0) {
                return res.json({message: 'All fields must be completed' })
            }
    //check if user exists
    //findOne is a query from mongoose
            User.findOne({ email: req.body.email })
    
            //or just 'email' instead of 'req.body.email' above
            .then(user => {
                if(user){
                    return res.status(403).json({message: 'User Already Exists'});
                }
                const newUser = new User();
                //name is actually req.body.email below is just shortcut
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
    
                newUser.name = name;
                newUser.email = email;
                newUser.password = hash;
    
                newUser
                    .save()
                    .then((user) => {
                        res.status(200).json({ message: 'User Created', user });
                    })
                    .catch(err => {
                        reject(err);
                    });
    
            }).catch(err=>{
                console.log(err)
            });
        });
    },
    login: (req,res) => {
        return new Promise((resolve,reject) => {
            User.findOne({email:req.body.email})
            .then((user) => {
                const passwordMatch = user.password === req.body.password ? true : false;
                if (!passwordMatch) {
                    return res.status(400).json({message: 'Incorrect email or password'});
                } else {
                    res.status(200).json({message: `You are now logged in ${user.email}`});
                    resolve(user);
                }
            })
            .catch(err => reject(err));
        });
    },
    updateProfile: (req, res) => {
        return new Promise((resolve, reject) => {
                User.findById({ _id: req.params.id})
                .then((user) => {
                    const { name, email} = req.body;
    
                    user.name = name ? name : user.name;
                    user.email = email ? email : user.email;
    
                    user
                    .save()
                    .then((user) => {
                        return res.status(200).json({message: "User updated", user});
                    })
                    .catch(err => reject(err));
                })
                .catch(err => res.status(500).json({message: 'Server Error', err}));
            });
    },
    deleteProfile: (req,res) => {
    
        return new Promise ((resolve, reject) => {
    
            User.findByIdAndDelete({ _id: req.params.id })
            .then(user => {
                return res.status(200).json({message: 'User Deleted', user});
            })
            .catch(err => res.status(400).json({message: 'No user to delete'}));
        });
    }
};