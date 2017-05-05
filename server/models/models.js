var request = require('request');
// var key = process.env.SC_CLIENT_ID;
var key = 'm875UgIcncRleDuMCgO642xcqCe8zvFD';
var secret = '1l02nmg7QaSTC4cjNxnSY4TSKLnGUo8r';
// var secret = process.env.SC_CLIENT_SECRET;
var axios = require('axios');
var request = require('request');

module.exports = {

  tracks: {

    get: function(searchTerms, callback) {
      //This function is invoked when the user makes a GET request for /tracks with specified searchTerms
      //It will get the above tracks, then for each subsequent track, it will make a call to get the iframe
      //for the track. It will then compose an array of all iframes and return it to the controller
      console.log(key);
      // searchTerms = 'Pop';
      // var options = {
      //   url: 'http://api.soundcloud.com/tracks/?client_id=' + key,
      //   method: 'GET',
      //   // qs: {'genres': searchTerms}
      // };

      // request(options, function(error, response, body) {
      //   if (!error) {
      //     console.log('retrieved tracks within the model');
      //   }
      //   var JSONbod = JSON.parse(body);
      //   var iframeArray = [];
      //   var size = Math.min(JSONbod.length, 15);
      //   console.log('total tracks received ',JSONbod.length);
      //   for (var i = 0; i < size; i++) {
      //     var trackURL = JSONbod[i]['permalink_url'];
      //     console.log('URL for which trying to get iframe ' + trackURL);
      //     var options = { url: 'http://soundcloud.com/oembed', 
      //       method: 'GET', 
      //       qs: {'url': trackURL, 'format': 'json', 'maxheight': '166', 'maxwidth': '600'}
      //     };
      //     request(options, function(error, response, body) {

      //       var JSONitem = JSON.parse(body);
      //       iframeArray.push(JSONitem.html);
      //       console.log('iframe received ' + JSONitem.html.toString());

      //       if (iframeArray.length === size) { //send back 15 items
      //         callback(null, iframeArray);
      //       }
      //     });
      //   }
      //   //convert body via JSON parse
      //   //iterate over every entry and get it's url 
      //   //for the url in question, make an API call to get iframe and add it to a results array
      //   //return results array
      // }); 

      axios.get('http://api.soundcloud.com/tracks/?client_id=' + key, {
        params: {
          genres: searchTerms
        }
      })
      .then(function(tracks) {

        console.log('My length is ', tracks['data'].length);
        var returnArray = [];
        for (var i = 0; i < Math.min(15, tracks['data'].length); i++) {
          returnArray[i] = tracks['data'][i];
        }
        console.log('Return array length is ', returnArray.length);
        callback(null, returnArray);
      })
      .catch(function(error) {
        console.log('Model error ', error);
        callback(error, null);
      });

    }
  },

  filter: {
    get: function(queryString, callback) {
      console.log('got to model for filter');
      var userOptions = {
        url: 'https://api.soundcloud.com/oauth2/token',
        method: 'POST',
        qs: {grant_type: 'password',
          client_id: key,
          client_secret: secret,
          username: 'aarondxavier@gmail.com',
          password: 'gvy-CP2-L8t-Vub',
          scope: 'non-expiring'
        }
      };

      request(userOptions, function(error, res, body) {
        if (error) {
          console.log('model got an error from SC trying to get user token', error);
          callback(error, null);
        } else {
          var token = JSON.parse(body).access_token;
          console.log('model got the following information from the server ', body);
          
          var feedOptions = {
            url: 'https://api.soundcloud.com/me/activities/tracks/affiliated',
            method: 'GET',
            qs: {oauth_token: token, limit: 500, order: '-created_at'}
          };

          request(feedOptions, function(error, res, body) {
            if(error) {
              console.log('model got an error trying to get feed from SC', error);
              callback(error, null);
            } else {
              console.log('got collection back of length ', JSON.parse(body).collection.length);
              var returnCollection = [];
              var collection = JSON.parse(body).collection;
              console.log(collection[0]);
              
              for (var i = 0; i < collection.length; i++) {
                if(!collection[i].origin) continue;
                var result = eval(queryString);
                if (result) {
                  returnCollection.push(collection[i]);
                }
              }

              console.log('return collection length', returnCollection.length);
              callback(null, JSON.stringify(returnCollection));
            }
          });
        }
      });

      
    }
  }

};