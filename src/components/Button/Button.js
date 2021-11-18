import s from './Button.module.css';
import { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className={s.Button} type="button" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
