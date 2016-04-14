import preact from 'preact'
const { h, Component } = preact

class TextArea extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || '',
      height: '100px' // min textarea height,
    }
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      //this.props.onSave(text)
    }
  }

  handleChange(e) {
    var height = Math.max(parseInt(e.target.style.height), e.target.scrollHeight - 40);
    this.setState({ text: e.target.value, height: height });
  }

  handleBlur(e) {

  }

  getStyles() {
    return Object.assign({}, styles.base, this.props.isValid ? styles.valid : styles.error, { height: this.state.height });
  }

  render() {
    return (
      <div>
        <textarea
          style={ this.getStyles() }
          placeholder={this.props.placeholder}
          autoFocus="true"
          value={ this.state.text }
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
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
    color: '#888',
    padding: '20px 5%',
    width: '90%',
    outline: 'none',
    resize: 'none',
    border: 'none'
  },
  valid: {

  },
  error: {

  },
  remaining: {
    fontStyle: 'italic',
    color: '#999',
    fontSize: '12pt',
    padding: '20px 5%',
    width: '100%',
    marginTop: '20px',
    borderTop: '1px solid #ddd'
  }
}

export default TextArea;
