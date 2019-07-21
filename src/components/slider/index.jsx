import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { urls, sliderImages } from '../../services/config';

// https://codepen.io/VoloshchenkoAl/pen/jBPEzG
// https://codesandbox.io/s/km4jyy4n0v?from-embed
// https://stackblitz.com/edit/demo-carousel

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
      <TransitionGroup component={null}>
        <CSSTransition
          in={false}
          key={this.state.current}
          classNames={{
            enter: isnext ? 'enter-next' : 'enter-prev',
            enterActive: 'enter-active',
            leave: 'leave',
            leaveActive: isnext ? 'leave-active-next' : 'leave-active-prev'
          }}
          timeout={{ enter: 500, exit: 700 }}
        >

          <div className="slider__item">
            <img src={imgSrc} alt='Slider img' />
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }

  renderSlider = () => (
    <div className="slider">
      {this.renderItem()}
      <nav>
        <button className="nav__prev" onClick={this.handlerPrev}>{'<<<'}</button>
        <button className="nav__next" onClick={this.handlerNext}>{'>>>'}</button>
      </nav>
    </div>
  )

  render() {
    return (
      <div className={'app_width'}>
        {this.renderSlider()}
      </div>
    );
  }
}

export default slider;