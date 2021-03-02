import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './type.reducer';
import { IType } from 'app/shared/model/type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeDetail = (props: ITypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { typeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Type [<b>{typeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">Code</span>
          </dt>
          <dd>{typeEntity.code}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{typeEntity.name}</dd>
          <dt>
            <span id="value">Value</span>
          </dt>
          <dd>{typeEntity.value}</dd>
          <dt>
            <span id="parent">Parent</span>
          </dt>
          <dd>{typeEntity.parent}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{typeEntity.state}</dd>
          <dt>Reference</dt>
          <dd>{typeEntity.referenceId ? typeEntity.referenceId : ''}</dd>
        </dl>
        <Button tag={Link} to="/type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/type/${typeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ type }: IRootState) => ({
  typeEntity: type.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeDetail);
