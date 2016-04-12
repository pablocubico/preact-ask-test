import { h, Component } from 'preact'

import FormComponent from './FormComponent'

class FormComposer extends Component {
  
  constructor(props, context) {
    super(props, context)
    this.state = {
      form: {
        saveDestination: 'http://coralasks.theguardian.com/ask/44',
        page: {
          id: 1,
          name: 'first_page',
          children: [
            {
              type: 'Rating',
              content: "Help us document every police killing in America",
              props: {
                steps: 5
              }
            },
            {
              type: 'TextArea',
              content: "The US government has no comprehensive record of the number of people killed by law enforcement...",
              props: {
                maxLength: 100
              }
            },
            {
              type: 'Audio',
              content: "Help us document every police killing in America",
              props: {
                steps: 5
              }
            },
          ]
        }
      }
    };
  }

  render() {
    return (
      <div>
        <h1>FormComposer</h1>
        {
          this.state.form.page.children.map((child, index) => {
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
