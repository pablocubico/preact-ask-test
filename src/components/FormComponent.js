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
      <div 
        style={ styles.base }>
          {
            h(
              Types[this.props.component],
              Object.assign({}, this.props)
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
