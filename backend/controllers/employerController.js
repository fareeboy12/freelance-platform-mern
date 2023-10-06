const User = require('../models/User');
const EmployerDetail = require('../models/EmployerDetail');

const updateProfile = async (req, res) => {
    const { firstName, lastName, companyName, companySize, email, phone, country, state, city, password, description, profilePicture } = req.body;
    const userId = req.body.userId;

    try {
        // Check if a employerDetail document exists for the given userId
        let employerDetail = await EmployerDetail.findOne({ userId });

        if (!employerDetail) {
            // If no document found, create a new one
            employerDetail = new EmployerDetail({
                userId,
                companyName,
                companySize,
                profilePicture,
                description,
            });

            // Save the new document to the collection
            await employerDetail.save();
        } else {
            // If document found, update it
            employerDetail.companyName = companyName;
            employerDetail.companySize = companySize;
            employerDetail.profilePicture = profilePicture;
            employerDetail.description = description;

            // Save the updated document
            await employerDetail.save();
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
                city
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                phone,
                country,
                state,
                city
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
        const employerDetail = await EmployerDetail.findOne({ userId });
        const userDetail = await User.findOne({ _id: userId }).select('-password');

        if (!employerDetail || !userDetail) {
            // If no employerDetail or userDetail found, return a 404 status and message
            return res.status(404).json({ message: 'Profile not found' });
        }

        // If both employerDetail and userDetail found, send them in the response
        res.status(200).json({ employerDetail, userDetail });
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
