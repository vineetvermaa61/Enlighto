const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req, res) => {
    try{
        // get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        // get userId
        const id = req.user.id;
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        // METHOD-2 :  DB mein entry ya update karne ka.
        // (object bana pada hai, object mein changes karne hain aur save function ka use karna hai)
        // kyonki object pehle se bana hai, DB mein koi entry create nahin karni
        // bas pehle se jo entry hai usmein changes karke save kar de rahen
        await profileDetails.save(); 
        // return response 
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


// deleteAccount
// EXPLORE: How can we schedule this deletion operation 
// EXPLORE: Chrone job
exports.deleteAccount = async(req, res) => {
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // delete user
        await User.findByIdAndDelete({_id: id});
        // TODO: HW: Unenroll user from all enrolled courses

        // return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully",
        });
    }
}

exports.getAllUserDetails = async(req, res) => {
    try{
        // get id
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
