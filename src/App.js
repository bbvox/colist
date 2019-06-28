import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

/* index hold all componenets */
import * as comp from "./components";
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePage: false
    }
    this.onSinglePage = this.onSinglePage.bind(this);
  }

  onSinglePage(singlePage) {
    this.setState({
      singlePage
    });
    //scroll page to TOP
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <>
              <comp.header />
              {!this.state.singlePage && <comp.slider />}
              <Route exact path="/" component={comp.home} />
              <Route exact path="/meals/:type" component={comp.multi} />
              <Route exact path="/meals/:type/:pageId" render={(props) => <comp.single appOnSingle={this.onSinglePage} {...props} />} />
              <comp.footer />
            </>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;