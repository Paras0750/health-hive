import React from "react";

class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src="https://source.unsplash.com/random/300" style={{ position: 'absolute', left: mouse.x-50, top: mouse.y-50 }} />
      );
    }
  }
  
  class MouseWithCat extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
  
          {/*
            We could just swap out the <p> for a <Cat> here ... but then
            we would need to create a separate <MouseWithSomethingElse>
            component every time we need to use it, so <MouseWithCat>
            isn't really reusable yet.
          */}
          <Cat mouse={this.state} />
        </div>
      );
    }
  }
  
  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <MouseWithCat />
        </div>
      );
    }
  }

  export default MouseTracker;