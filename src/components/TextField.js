import preact from 'preact'
const { h, Component } = preact

class TextField extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  onKeyDown(e) {
    this.setState({ text: e.target.value });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onFocus() {
    this.setState({ focused: true });
    this.props.onFocus();
  }

  getStyles() {
    return Object.assign({}, 
      styles.base, 
      this.props.isValid ? styles.valid : styles.error,
      this.state.focused ? styles.focused : {}
    );
  }

  getTitleStyles() {
    return Object.assign({}, 
      this.state.focused ? styles.focusedTitle : {}
    );
  }

  render() {
    return (
      <div>
        { 
          !!this.props.title ? 
            <h3 style={ this.getTitleStyles() }>{ this.props.title }</h3>
          :
            null
        }
        <input type="text"
          style={ this.getStyles() }
          placeholder={this.props.placeholder}
          defaultValue={ this.state.text }
          onFocus={ this.onFocus.bind(this) }
          onBlur={ this.onBlur.bind(this) }
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          maxLength={ !!this.props.maxLength ? this.props.maxLength : 'auto' }         
        />
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
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
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
    padding: '0px',
    textAlign: 'right',
    width: '100%',
    marginTop: '5px',
  }
}

export default TextField;
