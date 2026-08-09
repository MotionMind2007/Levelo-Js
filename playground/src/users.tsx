// src/users.tsx
import {params} from 'levelojs'
import {head} from 'levelojs';

export default function Users() {
  head({
    title: 'user'
  })
  return (
    <div style={{ padding: '20px' }}>
      <p>id: {params.id}</p>
      <h2>User Profile Page</h2>
      <p>Welcome to Levelo Js dynamic routing test!</p>
      <a href="/">home</a>
    </div>
  );
}