const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req, res) => {
    try{
        // data fetch
        const {sectionName, courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                            $push:{
                                                courseContent: newSection._id,
                                            }
                                        },
                                        {new: true},
                                    ).populate({
                                        path: "courseContent",
                                        populate: {
                                            path: "subSection",
                                        },
                                    })
                                    .exec();
        // HW: Use populate to replace sections/subsections both in updatedCourseDetails
        // return response
        return res.status(200).json({
            success: true,
            message: "Section Created Successfully",
            updatedCourseDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error.message,
        });
    }
}

exports.updateSection = async(req, res) => {
    try{
        // data input
         const {sectionName, sectionId} = req.body;
         // data validation
         if(!sectionName || !sectionId){
             return res.status(400).json({
                 success: false,
                 message: "Missing Properties",
             });
         }
        //  update data
         const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});
        // return res
        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update section, please try again",
            error: error.message,
        });
    }
}


exports.deleteSection = async(req, res) => {
    try{
        // get ID - assuming that we are sending id in parameters
        const {sectionId} = req.body;
        // HW: Course ko bhi update kar do
        //  use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // TESTING: do we need to delete the entry from the course schema ??
        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted Successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, please try again",
            error: error.message,
        });
    }
}
