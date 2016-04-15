
import preact from 'preact';
const {Component, h} = preact;

class Rating extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rating: 0,
      hovering: 0,
      focused: -1
    }
  }

  getStyles() {
    return Object.assign({}, styles.base, this.props.isValid ? styles.valid : styles.error);
  }

  onBlur() {
    this.setState({ focused: -1 });
  }

  onFocus(i, e) {
    this.setState({ focused: i });
    this.props.onFocus();
  }

  onHover(i, e) {
    this.setState({ hovering: i });
  }

  onMouseOut() {
    this.setState({ hovering: 0 });
  }

  getTokenStyle(i) {
    return Object.assign({}, 
      styles.token, 
      i == this.state.focused ? styles.focused : {},
      i < this.state.hovering ? styles.hovering : {}
    ); 
  }

  getTokens() {
    var tokens = [];
    var steps = this.props.steps || 5;
    for (var i = 0; i < steps; i++) {
      tokens.push(
        <button 
          onBlur={ this.onBlur.bind(this) }
          onFocus={ this.onFocus.bind(this, i) }
          onMouseOver={ this.onHover.bind(this, i + 1) } 
          style={ this.getTokenStyle(i) }
        >
          &#9733;
        </button>
      );
    }
    return tokens;
  }

  getTitleStyles() {
    return Object.assign({}, 
      this.props.hasFocus ? styles.focusedTitle : {}
    );
  }

  render() {

    return (
      <div style={ styles.base } onMouseOut={ this.onMouseOut.bind(this) }>
        { 
          !!this.props.title ? 
            <h3 style={ this.getTitleStyles() }>{ this.props.title }</h3>
          :
            null
        }
        {
          this.getTokens().map((token) => {
            return token
          })
        }
      </div>
    )
  }
}

const styles = {
  base: {
    display: 'block',
    color: '#888',
    width: '90%',
    outline: 'none',
    border: 'none',
    minHeight: '100px'
  },
  token: {
    fontSize: '50px',
    cursor: 'pointer',
    color: '#777',
    lineHeight: '50px',
    transition: 'color .2s',
    background: 'none',
    border: 'none',
    outline: 'none'
  },
  hovering: {
    color: '#EF5350'
  },
  focused: {
    color: '#42A5F5'
  },
  focusedTitle: {
    color: '#009688'
  }
}

export default Rating;
