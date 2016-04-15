import preact from 'preact';
const {h} = preact;
import FormComposer from '../src/components/FormComposer';

import '../src/style/index.css';

preact.render((
  <div>
    <FormComposer {...props} />
  </div>
), document.body);
