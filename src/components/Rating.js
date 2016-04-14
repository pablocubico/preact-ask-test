
import preact from 'preact';
const {Component, h} = preact;

class Rating extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rating: 0,
      hovering: 0
    }
  }

  getStyles() {
    return Object.assign({}, styles.base, this.props.isValid ? styles.valid : styles.error);
  }

  onHover(i, e) {
    console.log("mouse over");
    this.setState({ hovering: i });
    console.log(this.state);
    this.forceUpdate();
  }

  onMouseOut() {
    console.log("mouse out");
    this.setState({ hovering: 0 });
  }

  getTokenStyle(i) {
    return Object.assign({}, styles.token, i < this.state.hovering ? styles.hovering : {}); 
  }

  getTokens() {
    var tokens = [];
    var steps = this.props.steps || 5;
    for (var i = 0; i < steps; i++) {
      tokens.push(
        <span 
          onMouseOver={ this.onHover.bind(this, i + 1) } 
          style={ this.getTokenStyle(i) }
        >
          &#9733;
        </span>
      );
    }
    return tokens;
  }

  render() {
    console.log("render");
    return (
      <div style={ styles.base } onMouseOut={ this.onMouseOut.bind(this) }>
        {
          this.getTokens().map((token) => {
            return token
          })
        }
        <h2>Hovering: { this.state.hovering }</h2>
      </div>
    )
  }
}

const styles = {
  base: {
    display: 'block',
    color: '#888',
    padding: '20px 5%',
    width: '90%',
    outline: 'none',
    border: 'none',
    minHeight: '100px'
  },
  token: {
    fontSize: '50px',
    cursor: 'pointer',
    color: '#ddd',
    lineHeight: '50px',
    transition: 'color .2s'
  },
  hovering: {
    color: '#eb8'
  }
}

export default Rating;
