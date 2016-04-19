import preact from 'preact'
const { h, Component } = preact
import AskWidgetWrapper from './AskWidgetWrapper'

class AskComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentStep: 0
    }
    this.composerAnimationFrame = (function(){
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
    })();
  }

  componentDidMount() {
    this._composer.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnMount() {
    this._composer.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(e) {
    // pseudo fixed position, wouldn't be necessary on iframes
    this._footer.style.bottom = -e.target.scrollTop + "px";
  }

  onFocus(index) {
    this.setState({ currentStep: index });
  }

  previousStep() {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  nextStep() {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  onKeyDown(e) {
    //console.log(e, this.state.currentStep);
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

  onSave(payload) {
    console.log(payload);

  }

  render() {
    // field count is artificial, not the widget index
    var fieldCount = 0; 
    return ( 
      <div ref={ (composer) => this._composer = composer } style={ styles.base } onKeyDown={ this.onKeyDown.bind(this) }>
          {
            this.props.page.children.map((child, index) => {
              if (child.type == 'field') fieldCount++;
              return <AskWidgetWrapper
                  key={ index }
                  index={ index }
                  fieldNumber={ fieldCount }
                  hasFocus={ this.state.currentStep == index }
                  onFocus={ this.onFocus.bind(this, index) }
                  onSave={ this.onSave.bind(this) }
                  settings={ this.props.settings }
                  { ...child } />;
            })
          }
          <div style={ styles.footer } ref={ (footer) => this._footer = footer }>
            <div style={ styles.footerContent }>
              <div>
                0 of { fieldCount } questions answered.
                <button>SUBMIT</button>
              </div>
            </div>
          </div>
      </div>
    )
  }

}

const styles = {
  base: {
    background: '#eee',
    position: 'relative',
    paddingBottom: '150px',
    height: '700px',
    overflowY: 'auto'
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '50px',
    background: '#444'
  },
  footerContent: {
    padding: '10px'
  }
}

export default AskComposer;
