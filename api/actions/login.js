import User from '../models/User';

// Currently, our dummy login process requires no password
// Submitting a name to login as will either log you in as
// the user with that name, or will create a new user with
// that name if one doesn't exist yet.

export default function login(req) {
  const name = req.body.name.toLowerCase();

  return new Promise(resolve => {
    User.findOne({name})
      .lean()
      .exec(function(err, user) {
        if (err || user === null) {
          user = new User({name});
          user.save(function(saveErr) {
            if (saveErr) {
              // maybe we should pass something in here like null? not sure
              resolve();
            }
            user = user.toObject();
            req.session.user = user;
            resolve(user);
          })
        }

        req.session.user = user;
        resolve(user);
      });
  });
}

// Attempt at getting this to work using promises with mongoose:

// export default function login(req) {
  // const name = req.body.name.toLowerCase();

  // return new Promise(resolve => {
  //   return User.findOne({name}).lean().exec()
  //     .then(function(user) {
  //       if (user === null) {
  //         // User has not been created yet.
  //         // Let's just make it now for simplicity:
  //         const newUser = new User({name});
  //         newUser.save()
  //           .then(function(user) {
  //             req.session.user = user;
  //             resolve(newUser.toObject());
  //           })
  //           .catch(function(err) {
  //             console.error('COULD NOT CREATE NEW USER');
  //             resolve({});
  //           });
  //       }
  //
  //       // User exists already, simply log them in:
  //       console.log('LOGGING IN AS', user);
  //       req.session.user = user;
  //       resolve(user);
  //     })
  //     .catch(function(err) {
  //       // User has not been created yet.
  //       // Let's just make it now for simplicity:
  //       const newUser = new User({name});
  //       newUser.save()
  //         .then(function(user) {
  //           req.session.user = user;
  //           resolve(newUser.toObject());
  //         })
  //         .catch(function(err) {
  //           console.error('COULD NOT CREATE NEW USER');
  //           resolve({});
  //         });
  //     });
  // });
// }
