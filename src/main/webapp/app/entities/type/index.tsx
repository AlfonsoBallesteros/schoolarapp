import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Type from './type';
import TypeDetail from './type-detail';
import TypeUpdate from './type-update';
import TypeDeleteDialog from './type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Type} />
    </Switch>
  </>
);

export default Routes;
