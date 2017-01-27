import User from '../models/User';

export default function login(req) {

  const name = req.body.name.toLowerCase();

  return new Promise(resolve => {
    User.findOne({name})
      .lean()
      .exec(function(err, user) {
        if (err || user === null) {
          // User has not been created yet.
          // Let's just make it now for simplicity:
          // console.log('CREATING NEW USER with name', name);
          user = new User({name});
          user.save(function(saveErr) {
            if (saveErr) {
              // console.error('COULD NOT CREATE NEW USER:', saveErr);

              // We should probably returning a an object with a success
              // prop and a user prop to all these. We aren't yet, so
              // we will just try passing nothing here to resolve.
              // TODO: handle this error better/correctly
              resolve();
            }
            user = user.toObject();
            // console.log('CREATED NEW USER:', user);
            req.session.user = user;
            resolve(user);
          })
        }

        // console.log('LOGGING IN AS EXISTING USER:', user);
        req.session.user = user;
        resolve(user);
      });
  });

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

}

// export default function login(req) {
//   const user = {
//     name: req.body.name
//   };
//   req.session.user = user;
//   return Promise.resolve(user);
// }
