const User = require('../models/User');
const FreelancerDetail = require('../models/FreelancerDetail');

const updateProfile = async (req, res) => {
    const { firstName, lastName, profileTitle, email, phone, hourlyRate, country, state, city, password, description } = req.body;
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
                country,
                state,
                city,
                description,
                // ... other fields you want to set initially
            });

            // Save the new document to the collection
            await freelancerDetail.save();
        } else {
            // If document found, update it
            freelancerDetail.profileTitle = profileTitle;
            freelancerDetail.hourlyRate = hourlyRate;
            freelancerDetail.country = country;
            freelancerDetail.state = state;
            freelancerDetail.city = city;
            freelancerDetail.description = description;
            // ... update other fields as needed

            // Save the updated document
            await freelancerDetail.save();
        }

        // Update User schema only if password is provided
        if (password) {
            await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                password, // Assuming you hash the password before saving it in the database
                // ... other fields you want to update in User
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                firstName,
                lastName,
                email,
                // ... other fields you want to update in User except password
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

module.exports = {
    updateProfile,
};
