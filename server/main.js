
import preact from 'preact';
const {h} = preact;
import FormComposer from '../src/components/FormComposer';

preact.render((
  <div>
    <FormComposer {...props} />
  </div>
), document.body);
