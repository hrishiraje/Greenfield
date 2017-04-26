import React from 'react';
// import TrackList from './TrackList.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trackList: this.props.trackList
    };
  }

  render () {
    console.log('TrackList ', this.state.trackList);

    return (
      <div>
        <div>This is the main app</div>
        {/*<TrackList trackList={this.state.trackList}/>*/}
      </div>
    );
  }

}

export default App;
