import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Reference from './reference';
import ReferenceDetail from './reference-detail';
import ReferenceUpdate from './reference-update';
import ReferenceDeleteDialog from './reference-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReferenceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReferenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReferenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReferenceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Reference} />
    </Switch>
  </>
);

export default Routes;
