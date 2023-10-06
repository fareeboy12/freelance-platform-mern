const User = require('../models/User');
const FreelancerDetail = require('../models/FreelancerDetail');

const updateProfile = async (req, res) => {
    const { firstName, lastName, profileTitle, profilePicture, email, phone, hourlyRate, country, state, city, password, description, skills } = req.body;
    const userId = req.body.userId;

    try {
        // Check if a FreelancerDetail document exists for the given userId
        let freelancerDetail = await FreelancerDetail.findOne({ userId });

        if (!freelancerDetail) {
            // If no document found, create a new one
            freelancerDetail = new FreelancerDetail({
                userId,
                profileTitle,
                hourlyRate,
                skills,
                profilePicture,
                description,
            });

            // Save the new document to the collection
            await freelancerDetail.save();
        } else {
            // If document found, update it
            freelancerDetail.profileTitle = profileTitle;
            freelancerDetail.hourlyRate = hourlyRate;
            freelancerDetail.profilePicture = profilePicture;
            freelancerDetail.description = description;
            freelancerDetail.skills = skills;

            // Save the updated document
            await freelancerDetail.save();
        }

        // Update User schema only if password is provided
        if (password) {
            await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                phone,
                password,
                country,
                state,
                city,
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                phone,
                country,
                state,
                city,
            });
        }

        // Send a success response
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProfile = async (req, res) => {
    const userId = req.params.id; // Access userId from URL parameters

    try {
        // Find employerDetail document by userId
        const freelancerDetail = await FreelancerDetail.findOne({ userId });
        const userDetail = await User.findOne({ _id: userId }).select('-password');

        if (!freelancerDetail || !userDetail) {
            // If no employerDetail or userDetail found, return a 404 status and message
            return res.status(404).json({ message: 'Profile not found' });
        }

        // If both employerDetail and userDetail found, send them in the response
        res.status(200).json({ freelancerDetail, userDetail });
    } catch (error) {
        // Handle errors
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    updateProfile,
    getProfile
};
