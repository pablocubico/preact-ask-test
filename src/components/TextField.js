import preact from 'preact'
const { h, Component } = preact

import AskWidget from './AskWidget';

class TextField extends AskWidget {

  constructor(props, context) {
    super(props, context)
    // extend the state from AskWidget
    this.state = Object.assign(
      this.state,
      {
        text: this.props.text || ''
      }
    );
  }

  onKeyDown(e) {
    this.setState({ text: e.target.value });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onBlur() {
    if (!!this.state.text.length) {
      this.setState({ focused: false, completed: true, isValid: true });
    } else {
      this.setState({ focused: false, completed: false });
    }
    if (this.props.validateAs) {
      switch (this.props.validateAs) {
        case "email":
          var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          this.setState({ isValid: emailRegex.test(this.state.text) });
        break;
        case "url":
        break;
      }
    }
    (this.save.bind(this))();  
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

  render() {
    return (
      <div>
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
