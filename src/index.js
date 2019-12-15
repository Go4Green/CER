import ComponentRenderer from './static/js/singleton_instances/components-renderer';

import Application from "./static/js/Application.js";
import ApplicationStyles from "./static/css/styles.scss";

ComponentRenderer.display( document.querySelector('.app'), Application, {}, 'app-key-name' );