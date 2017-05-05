import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      genres: '',
      username: ''
    };
  }

  submitHandler() {
    console.log('Submithandler will send --> ', this.state.duration, this.state.genres, this.state.username);
    this.props.submitHandler(this.state.duration, this.state.genres, this.state.username);
  }

  checkBoxhandler(e) {
    if (this.state.genres === '') {
      this.setState({
        genres: e.target.value
      });
    } else {
      this.setState({
        genres: this.state.genres + ',' + e.target.value
      });
    }
  }

  durationHandler(e) {
    var lengthInMinutes = e.target.value;
    var lengthInMs = Number.parseFloat(lengthInMinutes) * 60000;
    this.setState({
      duration: lengthInMs
    });
  }

  usernameHandler(e) {
    this.setState({
      username: e.target.value
    });
  }

  render() {

    return (<div className="search-bar">

      <form>
        <label for="Genres">
          Genres
          <div className="checkbox-inline">
            <label for="Classical">
              <input type="checkbox"
              name="genre"
              value="Classical"
              id="Classical"
              onChange={this.checkBoxhandler.bind(this)} />
              Classical
            </label>
          </div>

          <div className="checkbox-inline">
            <label for="Country">
              <input type="checkbox"
              name="genre"
              value="Country"
              id="Country"
              onChange={this.checkBoxhandler.bind(this)} />
              Country
           </label>
          </div>

          <div className="checkbox-inline">
            <label for="Pop">
              <input type="checkbox"
              name="genre"
              value="Pop"
              id="Pop"
              onChange={this.checkBoxhandler.bind(this)} />
              Pop
            </label>
          </div>
        </label>

          <div className="filter-duration">
            <label for="Duration">
            Minimum Track Length
              <input type="text"
              name="duration"
              onChange={this.durationHandler.bind(this)} />
            </label>
          </div>

          <div className="filter-username">
            <label for="Username">
            Username
              <input type="text"
              name="username"
              onChange={this.usernameHandler.bind(this)} />
            </label>
          </div>
      </form>

      <input type="submit"
      value="Search"
      onClick={this.submitHandler.bind(this)} />
    </div>);

  }
}

export default Search;