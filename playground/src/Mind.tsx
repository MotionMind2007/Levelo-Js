// src/Mind.tsx
import { Pages, Page } from 'levelojs';
import Home from './home.js';
import Users from './users.js';

function Mind() {
  return (
      <Pages>
        <Page path="/" component={Home} />
        <Page path="/users/:id" component={Users} />
      </Pages>
  );
}
export default Mind;
