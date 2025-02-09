const userSchema = new mongoose.Schema({
    auth0Id: { type: String, unique: true, sparse: true }, 
    email: { type: String, unique: true }, 
    name: { type: String }, 
    password: { type: String }, 
    createdAt: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model('User', userSchema);