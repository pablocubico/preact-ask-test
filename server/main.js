
import preact from 'preact';
const {h} = preact;
import Rating from '../src/components/Rating';
import Audio from '../src/components/Audio';

preact.render((
  <div>
    <p>Awesomeee</p>
    <Audio />
    <Rating />
  </div>
), document.body);
