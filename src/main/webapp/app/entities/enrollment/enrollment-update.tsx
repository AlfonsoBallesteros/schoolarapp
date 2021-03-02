import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IType } from 'app/shared/model/type.model';
import { getEntities as getTypes } from 'app/entities/type/type.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { getEntity, updateEntity, createEntity, reset } from './enrollment.reducer';
import { IEnrollment } from 'app/shared/model/enrollment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnrollmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnrollmentUpdate = (props: IEnrollmentUpdateProps) => {
  const [workShopId, setWorkShopId] = useState('0');
  const [gradeProxId, setGradeProxId] = useState('0');
  const [studentId, setStudentId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { enrollmentEntity, types, people, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/enrollment' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTypes();
    props.getPeople();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...enrollmentEntity,
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
          <h2 id="schoolarappApp.enrollment.home.createOrEditLabel">Create or edit a Enrollment</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : enrollmentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="enrollment-id">ID</Label>
                  <AvInput id="enrollment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="peaceSafeFileLabel" for="enrollment-peaceSafeFile">
                  Peace Safe File
                </Label>
                <AvField id="enrollment-peaceSafeFile" type="text" name="peaceSafeFile" />
              </AvGroup>
              <AvGroup>
                <Label id="academicFileLabel" for="enrollment-academicFile">
                  Academic File
                </Label>
                <AvField id="enrollment-academicFile" type="text" name="academicFile" />
              </AvGroup>
              <AvGroup>
                <Label id="docStudentFileLabel" for="enrollment-docStudentFile">
                  Doc Student File
                </Label>
                <AvField id="enrollment-docStudentFile" type="text" name="docStudentFile" />
              </AvGroup>
              <AvGroup>
                <Label id="docDadFileLabel" for="enrollment-docDadFile">
                  Doc Dad File
                </Label>
                <AvField id="enrollment-docDadFile" type="text" name="docDadFile" />
              </AvGroup>
              <AvGroup>
                <Label id="docMomFileLabel" for="enrollment-docMomFile">
                  Doc Mom File
                </Label>
                <AvField id="enrollment-docMomFile" type="text" name="docMomFile" />
              </AvGroup>
              <AvGroup>
                <Label id="docTutorFileLabel" for="enrollment-docTutorFile">
                  Doc Tutor File
                </Label>
                <AvField id="enrollment-docTutorFile" type="text" name="docTutorFile" />
              </AvGroup>
              <AvGroup>
                <Label id="academicPeriodLabel" for="enrollment-academicPeriod">
                  Academic Period
                </Label>
                <AvField id="enrollment-academicPeriod" type="text" name="academicPeriod" />
              </AvGroup>
              <AvGroup>
                <Label id="yearLabel" for="enrollment-year">
                  Year
                </Label>
                <AvField id="enrollment-year" type="text" name="year" />
              </AvGroup>
              <AvGroup>
                <Label id="obsLabel" for="enrollment-obs">
                  Obs
                </Label>
                <AvField id="enrollment-obs" type="text" name="obs" />
              </AvGroup>
              <AvGroup>
                <Label id="workingDayLabel" for="enrollment-workingDay">
                  Working Day
                </Label>
                <AvField id="enrollment-workingDay" type="text" name="workingDay" />
              </AvGroup>
              <AvGroup>
                <Label id="enrollModalityLabel" for="enrollment-enrollModality">
                  Enroll Modality
                </Label>
                <AvField id="enrollment-enrollModality" type="text" name="enrollModality" />
              </AvGroup>
              <AvGroup check>
                <Label id="legacyLabel">
                  <AvInput id="enrollment-legacy" type="checkbox" className="form-check-input" name="legacy" />
                  Legacy
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="enrollment-state">
                  State
                </Label>
                <AvInput
                  id="enrollment-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && enrollmentEntity.state) || 'NUEVO'}
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
                <Label for="enrollment-workShop">Work Shop</Label>
                <AvInput id="enrollment-workShop" type="select" className="form-control" name="workShopId">
                  <option value="" key="0" />
                  {types
                    ? types.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="enrollment-gradeProx">Grade Prox</Label>
                <AvInput id="enrollment-gradeProx" type="select" className="form-control" name="gradeProxId">
                  <option value="" key="0" />
                  {types
                    ? types.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="enrollment-student">Student</Label>
                <AvInput id="enrollment-student" type="select" className="form-control" name="studentId">
                  <option value="" key="0" />
                  {people
                    ? people.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/enrollment" replace color="info">
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
  types: storeState.type.entities,
  people: storeState.person.entities,
  enrollmentEntity: storeState.enrollment.entity,
  loading: storeState.enrollment.loading,
  updating: storeState.enrollment.updating,
  updateSuccess: storeState.enrollment.updateSuccess
});

const mapDispatchToProps = {
  getTypes,
  getPeople,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentUpdate);
