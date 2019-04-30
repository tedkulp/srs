import React from 'react';
import { Route } from 'react-router';

import ReviewsMain from './main';

export default function() {
  return (
    <div>
      <Route path='/reviews' exact component={ReviewsMain} />
    </div>
  );
};
