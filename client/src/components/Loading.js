import React from 'react';

const Loading = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center',
  }}
  >
    Loading...
    <img src="719-loading.gif" alt="loading" style={{ height: '100px' }} />
  </div>
);

export default Loading;
