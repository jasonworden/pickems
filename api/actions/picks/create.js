import Pick from '../../models/Pick';

// Currently creates a pick that is sent from the client,
// using client-side validation and no server-side validation.
// This is bad, but okay for our dummy app :)
// TODO: Use robust server-side validation on making picks.

export default function create(req) {
  return new Promise((resolve, reject) => {
    // TODO: pull user securely off the session, not from the posted data
    if (!req.body.user) {
      reject("Please login to make a pick");
      return;
    }

    const newPick = new Pick(req.body);
    newPick.save(function(err, savedPick) {
      if (err) {
        reject("Unable to create pick");
        return;
      }
      savedPick.populate('nflteam week game', (err, pick) => {
        if (err) {
          reject('Could not populate saved pick');
        }
        resolve({
          pick: pick.toObject(),
        });
        return;
      });
    });
  });
}
