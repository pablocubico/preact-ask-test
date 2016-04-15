import preact from 'preact'
const { h, Component } = preact
import FormComponent from './FormComponent'

class FormComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentStep: 0,
      showFieldNumbers: true,
    }
  }

  onFocus(index) {
    this.setState({ currentStep: index });
  }

  getFieldWrapperStyles(child, index) {
    return Object.assign({}, 
      styles.formFieldWrapper, 
      this.state.currentStep == index ? styles.focused : styles.blurred,
      child.type == 'field' ? styles.withNumber : '' 
    );
  }

  previousStep() {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  nextStep() {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  onKeyDown(e) {
    console.log(e, this.state.currentStep);
    /*e.stopPropagation();
    switch (e.keyCode) {
      case 9: // Tab
        if (e.shiftKey) {
          this.previousStep();
        } else {
          this.nextStep();
        }
      break;
    }*/
  }

  render() {
    return ( 
      <div style={ styles.base } onKeyDown={ this.onKeyDown.bind(this) }>
          {
            this.props.form.page.children.map((child, index) => {
              return <div style={ this.getFieldWrapperStyles(child, index) }>
                { 
                  this.state.showFieldNumbers ?
                    <span style={ styles.fieldNumber }>{ index + 1 }.</span>
                  : 
                    null
                }
                <FormComponent
                  component={ child.component }
                  key={ index }
                  index={ index }
                  focusable={ child.focusable }
                  hasFocus={ this.state.currentStep == index }
                  onFocus={ this.onFocus.bind(this, index) }
                  { ...child.props } />
              </div>;
            })
          }
      </div>
    )
  }

}

const styles = {
  base: {
    background: '#eee'
  },
  formFieldWrapper: {
    borderBottom: '1px solid #999',
    transition: 'opacity .5s',
    position: 'relative',
    background: 'white'
  },
  withNumber: {
    padding: '15px 15px 15px 40px',
  },
  fieldNumber: {
    color: '#777',
    position: 'absolute',
    top: '15px',
    left: '0px',
    width: '30px',
    textAlign: 'right'
  },
  blurred: {
    opacity: .4
  },
  focused: {
    opacity: 1
  }
}

export default FormComposer;
