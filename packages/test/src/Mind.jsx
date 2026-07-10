import { Pages, Page } from 'levelojs';
import Home from './pages/home.jsx';

function Mind() {
  return (
    <Pages>
      <Page path="/" component={Home} />
    </Pages>
  )
}
export default Mind;