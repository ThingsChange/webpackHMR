// import CSS to bundle it with webpack
import css from '../scss/app.scss'; // eslint-disable-line

const message = require('./message');

const app = document.getElementById('app');
app.innerHTML = '<p>' + message.hi + ' ' + message.event + '</p>'; // eslint-disable-line

if (module.hot) {
  module.hot.accept();
}
