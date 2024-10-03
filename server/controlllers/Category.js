const Category = require("../models/Category");

// create tag ka handler function
exports.createCategory = async(req,res) => {
    try{
        // fetch data
        const { name, description } = req.body;
        // validation
        if(!name ||!description){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
            });
        }
        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};



// getAllTags handler function
exports.showAllCategory = async(req,res) => {
    try{
        const allCategory = await Category.find({}, {name:true, description:true});
        return res.status(200).json({
            success: true,
            message: "All category returned successfully",
            allCategory,
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}