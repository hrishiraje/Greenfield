import React from 'react';
// import TrackListEntry from './TrackListEntry.js';

var TrackList = function(props) {

  return (
    <div>
      {props.trackList.map(function(track) {
        return (<div track={track.>
          {track.html}
          </div>);
      })}
      </div>
  );
};

export default TrackList;