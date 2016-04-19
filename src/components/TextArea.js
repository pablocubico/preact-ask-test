import preact from 'preact'
const { h, Component } = preact

class TextArea extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      focused: false,
      text: this.props.text || '',
      height: '100px' // min textarea height,
    }
  }

  handleChange(e) {
    var height = Math.max(parseInt(e.target.style.height), e.target.scrollHeight - 40);
    this.setState({ text: e.target.value, height: height });
  }

  getStyles() {
    return Object.assign({}, 
      styles.base, 
      this.props.isValid ? styles.valid : styles.error, 
      this.state.focused ? styles.focused : {},
      { height: this.state.height }
    );
  }

  getTitleStyles() {
    return Object.assign({}, 
      this.state.focused ? styles.focusedTitle : {}
    );
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onFocus() {
    this.setState({ focused: true });
    this.props.onFocus();
  }

  render() {
    return (
      <div>
        <textarea
          style={ this.getStyles() }
          placeholder={this.props.placeholder}
          defaultValue={ this.state.text }
          onBlur={ this.onBlur.bind(this) }
          onFocus={ this.onFocus.bind(this) }
          onChange={this.handleChange.bind(this)}
          maxLength={ !!this.props.maxLength ? this.props.maxLength : 'auto' }
        ></textarea>
        {
          !!this.props.maxLength ?
            <div style={ styles.remaining }>{ this.props.maxLength - this.state.text.length } chars remaining.</div>
          :
            null
        }
      </div>
    )
  }
}

const styles = {
  base: {
    display: 'block',
    fontSize: '14pt',
    color: 'black',
    padding: '0 0 10px 0',
    width: '100%',
    outline: 'none',
    resize: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid #999',
    transition: 'border .5s'
  },
  focused: {
    borderBottom: '2px solid #009688'  
  },
  focusedTitle: {
    color: '#009688'
  },
  valid: {

  },
  error: {

  },
  remaining: {
    color: '#999',
    fontSize: '10pt',
    textAlign: 'right',
    width: '100%',
    marginTop: '20px',
  }
}

export default TextArea;
