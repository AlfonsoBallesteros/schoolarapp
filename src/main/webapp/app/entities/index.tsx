import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Person from './person';
import Type from './type';
import Reference from './reference';
import Enrollment from './enrollment';
import Course from './course';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}person`} component={Person} />
      <ErrorBoundaryRoute path={`${match.url}type`} component={Type} />
      <ErrorBoundaryRoute path={`${match.url}reference`} component={Reference} />
      <ErrorBoundaryRoute path={`${match.url}enrollment`} component={Enrollment} />
      <ErrorBoundaryRoute path={`${match.url}course`} component={Course} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
