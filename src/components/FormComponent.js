import preact from 'preact'
import * as Types from './Types'
const { h, Component } = preact

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
            Types[this.props.type],
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
