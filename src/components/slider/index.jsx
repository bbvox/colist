import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { urls, sliderImages } from '../../services/config';

// https://codepen.io/VoloshchenkoAl/pen/jBPEzG

class slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      next: true
    }

    this.handlerPrev = this.handlerPrev.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
  }

  handlerPrev(ev) {
    ev.preventDefault();

    if (!this.state.current) {
      return;
    }
    this.setState(prevState => ({
      current: prevState.current - 1,
      next: false
    }));
  }

  handlerNext(ev) {
    ev.preventDefault();
    const nextIndex = this.state.current + 1;
    if (!sliderImages[nextIndex]) {
      return;
    }

    this.setState(prevState => ({
      current: prevState.current + 1,
      next: true
    }));
  }

  //return Slider Image Source
  getImgSrc = () => (
    `${urls.slider}/${this.state.current}.jpg`
  )

  renderItem() {
    const imgSrc = this.getImgSrc();
    const isnext = this.state.next;
    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: isnext ? 'enter-next' : 'enter-prev',
          enterActive: 'enter-active',
          leave: 'leave',
          leaveActive: isnext ? 'leave-active-next' : 'leave-active-prev'
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className="slider__item" key={this.state.current}>
          <img src={imgSrc} alt='Slider img' />
        </div>
      </ReactCSSTransitionGroup>
    )
  }

  renderSlider() {
    return (
      <div className="slider">
        {this.renderItem()}
        <nav>
          <button className="nav__prev" onClick={this.handlerPrev}>{'<<<'}</button>
          <button className="nav__next" onClick={this.handlerNext}>{'>>>'}</button>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div className={'app_width'}>
        {this.renderSlider()}
      </div>
    );
  }
}

export default slider;
