import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Enrollment from './enrollment';
import EnrollmentDetail from './enrollment-detail';
import EnrollmentUpdate from './enrollment-update';
import EnrollmentDeleteDialog from './enrollment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EnrollmentDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnrollmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnrollmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnrollmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Enrollment} />
    </Switch>
  </>
);

export default Routes;
