const express = require("express");
const router = express.Router();
const User = require('../models/Users');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); 
    }
});

const upload = multer({
    storage: storage,
}).single('image');  

router.get('/', async (req, res) => {
    try {
        const users = await User.find();  
        res.render('index', {
            title: 'Home',
            users: users,
        });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/add', (req, res) => {
    res.render('add', { title: 'Add users' });
});

router.post('/add', upload, async (req, res) => {
    try {
        if (!req.file || !req.body.name || !req.body.phone || !req.body.email) {
            req.session.message = {
                type: 'danger',
                message: 'All fields are required!'
            };
            return res.redirect('/');  
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename, 
        });
        await user.save();

        req.session.message = {
            type: 'success',
            message: 'User added successfully!'
        };

        res.redirect('/');
        
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});


router.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.render('edit', {
            title: 'Edit',
            user: user,
        });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/update/:id', upload, async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = '';

        if (!req.body.name || !req.body.email || !req.body.phone) {
            req.session.message = {
                type: 'danger',
                message: 'All fields are required!',
            };
            return res.redirect('/');
        }

        if (req.file) {
            new_image = req.file.filename;
            try {
                const oldImagePath = path.join(__dirname, '../uploads/', req.body.old_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            } catch (err) {
                console.log('Error deleting old image:', err);
            }
        } else {
            new_image = req.body.old_image;
        }

        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        });

        req.session.message = {
            type: 'success',
            message: 'User updated successfully!',
        };

        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const result = await User.findByIdAndDelete(id);

        if (result) {
            if (result.image) {
                try {
                    const imagePath = path.join(__dirname, '../uploads', result.image);
                    if (fs.existsSync(imagePath)) {
                        await fs.promises.unlink(imagePath);  // Use fs.promises.unlink for async file deletion
                    }
                } catch (err) {
                    console.log('Error deleting image:', err);
                }
            }

            req.session.message = {
                type: 'info',
                message: 'User deleted successfully'
            };
        } else {
            req.session.message = {
                type: 'danger',
                message: 'User not found'
            };
        }

        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;
