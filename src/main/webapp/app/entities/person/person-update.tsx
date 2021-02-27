import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPersonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonUpdate = (props: IPersonUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { personEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/person' + props.location.search);
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
        ...personEntity,
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
                <Label id="birthdateLabel" for="person-birthdate">
                  Birthdate
                </Label>
                <AvField id="person-birthdate" type="text" name="birthdate" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="person-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="person-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="districtLabel" for="person-district">
                  District
                </Label>
                <AvField id="person-district" type="text" name="district" />
              </AvGroup>
              <AvGroup>
                <Label id="neighborhoodLabel" for="person-neighborhood">
                  Neighborhood
                </Label>
                <AvField id="person-neighborhood" type="text" name="neighborhood" />
              </AvGroup>
              <AvGroup>
                <Label id="stratusLabel" for="person-stratus">
                  Stratus
                </Label>
                <AvField id="person-stratus" type="text" name="stratus" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="person-address">
                  Address
                </Label>
                <AvField id="person-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="rhLabel" for="person-rh">
                  Rh
                </Label>
                <AvField id="person-rh" type="text" name="rh" />
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
                <Label id="relationsLabel" for="person-relations">
                  Relations
                </Label>
                <AvField id="person-relations" type="text" name="relations" />
              </AvGroup>
              <AvGroup>
                <Label id="stateCivilLabel" for="person-stateCivil">
                  State Civil
                </Label>
                <AvField id="person-stateCivil" type="text" name="stateCivil" />
              </AvGroup>
              <AvGroup>
                <Label id="professionLabel" for="person-profession">
                  Profession
                </Label>
                <AvField id="person-profession" type="text" name="profession" />
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
  personEntity: storeState.person.entity,
  loading: storeState.person.loading,
  updating: storeState.person.updating,
  updateSuccess: storeState.person.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonUpdate);
