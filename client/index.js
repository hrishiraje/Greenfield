import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

$.get('/tracks', function(data) {
  var JSONdata = JSON.parse(data);

  ReactDOM.render (
      <App trackList={JSONdata}/>, document.getElementById('app')
  );

});
