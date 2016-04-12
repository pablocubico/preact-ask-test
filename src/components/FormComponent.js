import { h, Component } from 'preact'

class FormComponent extends Component {
  
  constructor(props, context) {
    super(props, context)
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{ this.props.type }</h2>
        { 
          h(
            require('./' + this.props.type).default, 
            this.props
          ) 
        }
      </div>
    )
  }
  
}

const styles = {
  base: {
  }
}

export default FormComponent;
