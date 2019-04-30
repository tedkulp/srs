import React from 'react';
import { Route } from 'react-router';

import HomeMain from './main';

export default function() {
  return (
    <div>
      <Route path='/' exact component={HomeMain} />
    </div>
  );
};
