var model = require('../models/models');

module.exports = {
  tracks: {
    get: function(req, res) {
      console.log('got to the controller for tracks');
      model.tracks.get('', function(err, tracks) {
        if (err) {
          res.status(404)
          .append('Access-Control-Allow-Origin', '*')
          .send('Failed with err ' + err);
        } else {
          console.log('tracks that the controller will send back ', tracks);
          res.status(200)
          .append('Access-Control-Allow-Origin', '*')
          .send(tracks);
        }
      });
    }
  }
};

