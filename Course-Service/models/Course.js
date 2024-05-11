 const { model, Schema } =  require('mongoose');

const courseSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required'],
        
        maxLength: [59, 'Title should be less than 60 character'],
        trim: true
    },
    description: {
        type: String,
        required: true,
        
        maxLength: [1000, 'Description should be less than 500 character'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    thumbnail: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: {
                    type: String 
                },
                secure_url: {
                    type: String
                }
            }
        }
    ],
    numberOfLectures: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: true,
    },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
},
    {
        timestamps: true
    })

const Course = model("Course", courseSchema);

module.exports =Course