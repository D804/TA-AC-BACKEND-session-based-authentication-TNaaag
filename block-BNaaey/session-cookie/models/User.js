let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// userSchema.pre('save', function (next) {
//   if (this.password && this.isModified('password')) {
//     bcrypt.hash(this.password, 10, (err, hash) => {
//       if (err) return next(err);
//       this.password = hash;
//       next();
//     });
//   } else {
//     next();
//   }
// });
// userSchema.method.verifyPassword = function (password, cb) {
//   bcrypt.compare(password, this.password, (err, result) => {
//     return cb(err, result);
//   });
// };
userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});
userSchema.method.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, result) {
    return cb(err, result);
  });
};
module.exports = mongoose.model('User', userSchema);
