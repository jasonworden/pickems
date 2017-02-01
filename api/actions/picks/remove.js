import Pick from '../../models/Pick';

// Currently creates a pick that is sent from the client,
// using client-side validation and no server-side validation.
// This is bad, but okay for our dummy app :)
// TODO: Use robust server-side validation on making picks.

export default function remove(req) {
  return new Promise((resolve, reject) => {
    // TODO: pull user securely off the session, not from the posted data
    if (!req.body.user) {
      reject("Please login to remove a pick");
      return;
    }

    Pick.findById(req.body.pick._id)
      .remove(function(err) {
        if(err) {
          reject("Unable to remove pick");
          return;
        }

        resolve(req.body);
        return;
      })
  });
}
