const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// createCourse handler function
exports.createCourse = async(req, res) => {
    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName ||!courseDescription ||!whatYouWillLearn ||!price ||!category ||!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);
        // TODO: verify that userId and instructorDetails._id are same or different?

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details not found",
            });
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "category details not found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnailImage: thumbnailImage.secure_url,
        })

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {new: true},
        );

        // update the category ka schema
        // TODO: HW
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
}

// getAllCourses handler function
exports.showAllCourses = async(req, res) => {
    try{

        // TODO: Change the below statement incrementally
        const allCourses = await Course.find({});

        // const allCourses = await Course.find({}, { courseName: true,
        //                                             price: true,
        //                                             thumbnail: true,
        //                                             instructor: true,
        //                                             ratingAndReviews: true,
        //                                             studentsEnrolled: true})
        //                                             .populate("instructor")
        //                                             .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,
        });
    }
}

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try{
        // get id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.find(
                                    {_id: courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate: {
                                                path: "additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReviews")
                                    .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection"
                                            }, 
                                        })
                                    .exec();
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find the course with course id:  ${courseId}`,
            });
        }
        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}