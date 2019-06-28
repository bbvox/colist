import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { urls, sliderImages } from '../../services/config';

let cnt = 0;
const ImgBox = (props) => {
  cnt ++;
  return (
    <TransitionGroup className="animImg">
      <div className="tst" key={cnt}>
        <img src={props.imgSrc} alt='Slider img' />
      </div>
    </TransitionGroup>  
  )
}

// const Slider = (props) => {
// -  const sliderStyle = {
// -    // position: 'relative',
// -    textAlign: 'center',
// -    background: '#f5f5f5',
// -    marginBottom: '1rem'
// -  }
// -  return (
// -    <div style={sliderStyle}>
// -      <img src={`${rootUrl}/images/slider4.jpg`} alt=' ' />
// -    </div>
// -  )
// -}


// https://codepen.io/VoloshchenkoAl/pen/jBPEzG
class slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1
    }

    this.handlerPrev = this.handlerPrev.bind(this);
    this.handlerNext = this.handlerNext.bind(this);
  }

  handlerPrev (ev) {
    ev.preventDefault();
    let { active } = this.state;
    active--;

    this.setState({ active });
  }

  handlerNext (ev) {
    ev.preventDefault();
    let { active } = this.state;

    active++;
    this.setState({ active });
  }

  renderImg () {
    const imgSrc = `${urls.slider}/${this.state.active}.jpg`;
    const isnext = true;
    return (

      <TransitionGroup className="animImg">
        <div className="tst">
          <img src={imgSrc} alt='Slider img' />
        </div>
      </TransitionGroup>    
    )
  }

  renderSlider() {
    const imgSrc = `${urls.slider}/${this.state.active}.jpg`;
    return (
      <div className="slider">
        <div className="slider__item">
          <ImgBox imgSrc={imgSrc} />
          <nav>
            <button className="nav__prev" onClick={this.handlerPrev}>{'<<<'}</button>
            <button className="nav__next" onClick={this.handlerNext}>{'>>>'}</button>
          </nav>
        </div>
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
