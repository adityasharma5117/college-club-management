const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
    User
} = require("../models/user")


const nodemailer = require('nodemailer');

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'VITBhopalClubManagementHUB@gmail.com',
        pass: 'gpst eqmb lfir ikaf'
    }
});


router.post("/", async (req, res) => {
    const {
        name,
        regNumber,
        email,
        password,
        clubPreference
    } = req.body;

    const existingUser = await User.findOne({
        email
    });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name: name,
        password: hashedPassword,
        email: email,
        regNumber: regNumber,
        clubPreference: clubPreference,
    })

    

    await newUser.save();
    // ... (existing code for user registration)


    

    // Send a registration email to the user
    const mailOptions = {
        from: 'VITBhopalClubManagementHUB@gmail.com',
        to: newUser.email,
        subject: 'Registration Confirmation',
        text: "Welcome to the Vit Bhopal Club Management HUB! We are excited to have you as a member of our club community.At Vit Bhopal, we believe that clubs are an integral part of your college experience, and we're thrilled that you've decided to join us. You are now part of a vibrant community of students who share your interests and passions. Here's what you can expect from your membership with us: 1. **Explore Our Clubs:** We have a wide range of clubs catering to diverse interests. Feel free to browse and explore our list of clubs to find the ones that resonate with you. 2. **Join a Club:** Participating in clubs is a fantastic way to make new friends and pursue your hobbies.3. **Stay Informed:** We'll keep you updated with club events, meetings, and news via email and announcements on our website. Make sure to check your inbox and stay engaged with your club community.4. **Get Involved:** Whether you're looking to be an active member, an officer, or just want to attend club events, there are plenty of opportunities to get involved. Don't hesitate to reach out to club leaders if you have any questions or ideas.5. **Stay Connected:** Follow us on social media to stay connected and receive the latest updates on club activities, news, and events.If you ever have any questions or need assistance, our dedicated support team is here to help. Just reply to this email or visit our Contact Us page on the website.We hope your experience with Vit Bhopal Club Management HUB will be rewarding, and we look forward to seeing you at club events and meetings. Welcome aboard!Best regards"
    };

    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
        
    return res.status(201).json({
        message: 'User signed up successfully',
        user: newUser
    });
 
})

module.exports = router;