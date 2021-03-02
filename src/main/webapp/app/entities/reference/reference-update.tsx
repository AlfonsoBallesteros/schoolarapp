import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './reference.reducer';
import { IReference } from 'app/shared/model/reference.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReferenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReferenceUpdate = (props: IReferenceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { referenceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/reference' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...referenceEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="schoolarappApp.reference.home.createOrEditLabel">Create or edit a Reference</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : referenceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="reference-id">ID</Label>
                  <AvInput id="reference-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="reference-name">
                  Name
                </Label>
                <AvField id="reference-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="reference-value">
                  Value
                </Label>
                <AvField id="reference-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="reference-state">
                  State
                </Label>
                <AvInput
                  id="reference-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && referenceEntity.state) || 'NUEVO'}
                >
                  <option value="NUEVO">NUEVO</option>
                  <option value="ANTIGUO">ANTIGUO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="ACEPTADO">ACEPTADO</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/reference" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  referenceEntity: storeState.reference.entity,
  loading: storeState.reference.loading,
  updating: storeState.reference.updating,
  updateSuccess: storeState.reference.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReferenceUpdate);
