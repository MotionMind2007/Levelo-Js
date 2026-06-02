import { Pages, Page } from 'levelojs';
import Home from './pages/home.jsx';
import Document from './pages/document.jsx';

function Mind() {
  return (
    <Pages>
      <Page path="/" component={Home} />
      <Page path="/document" component={Document} />
    </Pages>
  )
}
export default Mind;