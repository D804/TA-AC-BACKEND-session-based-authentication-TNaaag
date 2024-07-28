let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, max: 15, required: true },
  },
  { timestamps: true }
);
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, function (err, hash) {
      if (err) return next(err);
      this.password = hash;
      return next();
    });
  } else {
    next();
  }
});
module.exports = mongoose.model('User', UserSchema);
