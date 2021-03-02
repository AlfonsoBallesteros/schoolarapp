import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReference } from 'app/shared/model/reference.model';
import { getEntities as getReferences } from 'app/entities/reference/reference.reducer';
import { getEntity, updateEntity, createEntity, reset } from './type.reducer';
import { IType } from 'app/shared/model/type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeUpdate = (props: ITypeUpdateProps) => {
  const [referenceId, setReferenceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { typeEntity, references, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/type' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getReferences();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...typeEntity,
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
          <h2 id="schoolarappApp.type.home.createOrEditLabel">Create or edit a Type</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : typeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="type-id">ID</Label>
                  <AvInput id="type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="type-code">
                  Code
                </Label>
                <AvField id="type-code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="type-name">
                  Name
                </Label>
                <AvField id="type-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="type-value">
                  Value
                </Label>
                <AvField id="type-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label id="parentLabel" for="type-parent">
                  Parent
                </Label>
                <AvField id="type-parent" type="text" name="parent" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="type-state">
                  State
                </Label>
                <AvInput
                  id="type-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && typeEntity.state) || 'NUEVO'}
                >
                  <option value="NUEVO">NUEVO</option>
                  <option value="ANTIGUO">ANTIGUO</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="ACEPTADO">ACEPTADO</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="type-reference">Reference</Label>
                <AvInput id="type-reference" type="select" className="form-control" name="referenceId">
                  <option value="" key="0" />
                  {references
                    ? references.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/type" replace color="info">
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
  references: storeState.reference.entities,
  typeEntity: storeState.type.entity,
  loading: storeState.type.loading,
  updating: storeState.type.updating,
  updateSuccess: storeState.type.updateSuccess
});

const mapDispatchToProps = {
  getReferences,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeUpdate);
