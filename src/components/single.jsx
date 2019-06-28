import React from "react";
// import { CSSTransitionGroup } from 'react-transition-group' // ES6
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { rootUrl, singleMenu } from "../services/config";

import { getData } from "../services/single";


class single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      prods: [],
      error: "",
      anims: ["one", "two", "three", "four"]
    };

    this.handleAddAnim = this.handleAddAnim.bind(this);
    this.handleRemoveAnim = this.handleRemoveAnim.bind(this);
  }
  //only 1 is available
  getData(pageId) {
    getData(pageId).then(resData => {
      this.setState({
        info: resData[0],
        prods: resData[1]
      })
    }).catch(err => {
      this.setState({
        error: "Only pageID 1 is available"
      })
      this.getData(1);
    })
  }

  // connected with parent component 
  // turn on / off Slider on Single page
  componentWillMount() {
    this.props.appOnSingle(true);
    
    const { pageId } = this.props.match.params;
    this.getData(pageId);
  }

  componentWillUnmount() {
    this.props.appOnSingle(false);
  }

  handleAddAnim () {
    const newItems = this.state.anims.concat([
      prompt('Enter some text')
    ]);
    this.setState({anims: newItems});
  }

  handleRemoveAnim(i) {
    let newItems = this.state.anims.slice();
    newItems.splice(i, 1);
    this.setState({anims: newItems});
  }

  renderMenu() {
    return (
      <React.Fragment>
        <h3 className="title tcenter marg0-b">Пица Сицилиана</h3>
        <ul className="sub_menu">
          {singleMenu.map((val, ind) => (
            <li key={ind}><a href={val.href}>{val.title}</a></li>
          ))}
        </ul>
      </React.Fragment>
    )
  }

  renderInfo() {
    const { info } = this.state;
    return (
      <React.Fragment>
        <h3 className="title sub">Начин на приготвяне</h3>
        <i className="fas fa-clock marg1">&nbsp;{info.time} мин.</i>
        <i className="fas fa-utensils marg1">&nbsp;{info.portions} порции</i>

        <p dangerouslySetInnerHTML={{__html: info.info}}></p>
      </React.Fragment>
    );
  }

  renderProducts () {
    const { prods } = this.state;
    return (
      <React.Fragment>
        <h3 className="title sub">Продукти</h3>
        <ul className="sub_menu">
          {prods.map((prod, k) => 
            <li className="prod_item" key={k}>{prod.title} - {prod.quantity}</li>
          )}
        </ul>
      </React.Fragment>
    );
  }

  renderAds () {
    const items = this.state.anims.map((item, i) => (
      <div key={item} onClick={() => this.handleRemoveAnim(i)}>
        {item}
      </div>
    ));
    return (
      <div>
        <button onClick={this.handleAddAnim}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  renderMain () {
    return (
      <article className="grid single">
        <div className="item imenu">
          {this.renderMenu()}
        </div>
        <div className="item iimg">
          <h3 className="title">Пица Сицилиана</h3>
          <img src={`${rootUrl}/images/pizza.jpg`} alt=' ' />
        </div>
        <div className="item iinfo">
          {this.renderInfo()}
        </div>
        <div className="item iprod box_shadow">
          {this.renderProducts()}
        </div>
        <div className="item iads">
          {this.renderAds()}
        </div>
      </article>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="app_width">
        <h2> Ядене : {this.props.match.params.type} </h2>
        </div>
        <main className={'app_width app_white'}>
          {this.renderMain()}
        </main>
    </React.Fragment>
    );
  }
}

export default single;