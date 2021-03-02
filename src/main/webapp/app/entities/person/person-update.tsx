import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { IType } from 'app/shared/model/type.model';
import { getEntities as getTypes } from 'app/entities/type/type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPersonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonUpdate = (props: IPersonUpdateProps) => {
  const [idscourses, setIdscourses] = useState([]);
  const [courseId, setCourseId] = useState('0');
  const [typeIdId, setTypeIdId] = useState('0');
  const [genderId, setGenderId] = useState('0');
  const [neighborhoodId, setNeighborhoodId] = useState('0');
  const [cityId, setCityId] = useState('0');
  const [birthplaceId, setBirthplaceId] = useState('0');
  const [nacionalityId, setNacionalityId] = useState('0');
  const [cityExpId, setCityExpId] = useState('0');
  const [rhId, setRhId] = useState('0');
  const [epsId, setEpsId] = useState('0');
  const [relationId, setRelationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { personEntity, courses, types, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/person' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCourses();
    props.getTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...personEntity,
        ...values,
        courses: mapIdList(values.courses)
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
          <h2 id="schoolarappApp.person.home.createOrEditLabel">Create or edit a Person</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : personEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="person-id">ID</Label>
                  <AvInput id="person-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="person-name">
                  Name
                </Label>
                <AvField id="person-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="surnameLabel" for="person-surname">
                  Surname
                </Label>
                <AvField id="person-surname" type="text" name="surname" />
              </AvGroup>
              <AvGroup>
                <Label id="documentIdLabel" for="person-documentId">
                  Document Id
                </Label>
                <AvField id="person-documentId" type="text" name="documentId" />
              </AvGroup>
              <AvGroup>
                <Label id="documentExpDateLabel" for="person-documentExpDate">
                  Document Exp Date
                </Label>
                <AvField id="person-documentExpDate" type="date" className="form-control" name="documentExpDate" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="person-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="person-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="telephonNumberLabel" for="person-telephonNumber">
                  Telephon Number
                </Label>
                <AvField id="person-telephonNumber" type="text" name="telephonNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="birthdateLabel" for="person-birthdate">
                  Birthdate
                </Label>
                <AvField id="person-birthdate" type="date" className="form-control" name="birthdate" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="person-address">
                  Address
                </Label>
                <AvField id="person-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="districtLabel" for="person-district">
                  District
                </Label>
                <AvField id="person-district" type="text" name="district" />
              </AvGroup>
              <AvGroup>
                <Label id="stratusLabel" for="person-stratus">
                  Stratus
                </Label>
                <AvField id="person-stratus" type="text" name="stratus" />
              </AvGroup>
              <AvGroup check>
                <Label id="diseaseLabel">
                  <AvInput id="person-disease" type="checkbox" className="form-check-input" name="disease" />
                  Disease
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="disabilityLabel">
                  <AvInput id="person-disability" type="checkbox" className="form-check-input" name="disability" />
                  Disability
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="stateCivilLabel" for="person-stateCivil">
                  State Civil
                </Label>
                <AvField id="person-stateCivil" type="text" name="stateCivil" />
              </AvGroup>
              <AvGroup>
                <Label id="ocupationLabel" for="person-ocupation">
                  Ocupation
                </Label>
                <AvField id="person-ocupation" type="text" name="ocupation" />
              </AvGroup>
              <AvGroup>
                <Label id="parentLabel" for="person-parent">
                  Parent
                </Label>
                <AvField id="person-parent" type="text" name="parent" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="person-state">
                  State
                </Label>
                <AvInput
                  id="person-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && personEntity.state) || 'NUEVO'}
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
                <Label for="person-typeId">Type Id</Label>
                <AvInput id="person-typeId" type="select" className="form-control" name="typeIdId">
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
                <Label for="person-gender">Gender</Label>
                <AvInput id="person-gender" type="select" className="form-control" name="genderId">
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
                <Label for="person-neighborhood">Neighborhood</Label>
                <AvInput id="person-neighborhood" type="select" className="form-control" name="neighborhoodId">
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
                <Label for="person-city">City</Label>
                <AvInput id="person-city" type="select" className="form-control" name="cityId">
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
                <Label for="person-birthplace">Birthplace</Label>
                <AvInput id="person-birthplace" type="select" className="form-control" name="birthplaceId">
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
                <Label for="person-nacionality">Nacionality</Label>
                <AvInput id="person-nacionality" type="select" className="form-control" name="nacionalityId">
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
                <Label for="person-cityExp">City Exp</Label>
                <AvInput id="person-cityExp" type="select" className="form-control" name="cityExpId">
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
                <Label for="person-rh">Rh</Label>
                <AvInput id="person-rh" type="select" className="form-control" name="rhId">
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
                <Label for="person-eps">Eps</Label>
                <AvInput id="person-eps" type="select" className="form-control" name="epsId">
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
                <Label for="person-relation">Relation</Label>
                <AvInput id="person-relation" type="select" className="form-control" name="relationId">
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
                <Label for="person-courses">Courses</Label>
                <AvInput
                  id="person-courses"
                  type="select"
                  multiple
                  className="form-control"
                  name="courses"
                  value={personEntity.courses && personEntity.courses.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {courses
                    ? courses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/person" replace color="info">
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
  courses: storeState.course.entities,
  types: storeState.type.entities,
  personEntity: storeState.person.entity,
  loading: storeState.person.loading,
  updating: storeState.person.updating,
  updateSuccess: storeState.person.updateSuccess
});

const mapDispatchToProps = {
  getCourses,
  getTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonUpdate);
