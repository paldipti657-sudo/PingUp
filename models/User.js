import  mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    _id: {typ: String, required: true},
    email: {typ: String, required: true},
    full_name: {typ: String, required: true},
    username: {typ: String, unique: true},
    bio: {typ: String, default: 'Hey there! I am using PingUp.'},
    profile_picture: {typ: String, default: ''},
    cover_photo: {typ: String, default: ''},
    location: {typ: String, default: ''},
    followers: [{typ: String, ref: 'User'}],
     following: [{typ: String, ref: 'User'}],
      connections: [{typ: String, ref: 'User'}],
   


},{timestamps: true, minimize: false})

const User = mongoose.model('User', userSchema)
export default User