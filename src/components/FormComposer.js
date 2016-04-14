import preact from 'preact'
const { h, Component } = preact
import FormComponent from './FormComponent'

class FormComposer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h1>FormComposer</h1>
        {
          this.props.form.page.children.map((child, index) => {
            return <FormComponent
                      type={ child.type }
                      key={ index }
                      { ...child.props } />
          })
        }
      </div>
    )
  }

}

const styles = {
  base: {
  }
}

export default FormComposer;
