import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reference.reducer';
import { IReference } from 'app/shared/model/reference.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReferenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReferenceDetail = (props: IReferenceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { referenceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Reference [<b>{referenceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{referenceEntity.name}</dd>
          <dt>
            <span id="value">Value</span>
          </dt>
          <dd>{referenceEntity.value}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{referenceEntity.state}</dd>
        </dl>
        <Button tag={Link} to="/reference" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reference/${referenceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ reference }: IRootState) => ({
  referenceEntity: reference.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceDetail);
