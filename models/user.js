var mongoose =require ('mongoose');
var bcrypt = require ('bcrypt-nodejs');
var Schema = mongoose.Schema;


/* the user schema attributes / charateristics/ field */
var UserSchema = new Schema ({
    email: {type: String , unique: true, lowercase: true },
    password: String,

    profile:{
      name: { type: String, default: ''},
      picture: { type: String, default: ''},

    },

    address: String,
    history: [{
       date: Date,
       paid: {type : Number , default :0},
       //item: {type: Schema.Types.ObjectId, ref: ''}
    }]
});

 /* hash the password before we even save it to the database */
UserSchema.pre('save', function(next){
    var user =this;
    if (!user.isModified('password')) return next ();
    bcrypt.genSalt(10, function(err, salt ){
    if (err) return next(err);
    bcrypt.hash (user.passwor, salt, null,function(err,hash){
      if (err)return (err);
      user.password = hash;
      next ();
     });
  });
});


 /* compare password in to the database and the onr that the user type in  */
 UserSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password,this.password);

 }

module.exports= mongoose.model('User', UserSchema);
