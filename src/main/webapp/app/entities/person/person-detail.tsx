import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonDetail = (props: IPersonDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { personEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Person [<b>{personEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{personEntity.name}</dd>
          <dt>
            <span id="surname">Surname</span>
          </dt>
          <dd>{personEntity.surname}</dd>
          <dt>
            <span id="documentId">Document Id</span>
          </dt>
          <dd>{personEntity.documentId}</dd>
          <dt>
            <span id="documentExpDate">Document Exp Date</span>
          </dt>
          <dd>
            <TextFormat value={personEntity.documentExpDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{personEntity.phoneNumber}</dd>
          <dt>
            <span id="telephonNumber">Telephon Number</span>
          </dt>
          <dd>{personEntity.telephonNumber}</dd>
          <dt>
            <span id="birthdate">Birthdate</span>
          </dt>
          <dd>
            <TextFormat value={personEntity.birthdate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{personEntity.address}</dd>
          <dt>
            <span id="district">District</span>
          </dt>
          <dd>{personEntity.district}</dd>
          <dt>
            <span id="stratus">Stratus</span>
          </dt>
          <dd>{personEntity.stratus}</dd>
          <dt>
            <span id="disease">Disease</span>
          </dt>
          <dd>{personEntity.disease ? 'true' : 'false'}</dd>
          <dt>
            <span id="disability">Disability</span>
          </dt>
          <dd>{personEntity.disability ? 'true' : 'false'}</dd>
          <dt>
            <span id="stateCivil">State Civil</span>
          </dt>
          <dd>{personEntity.stateCivil}</dd>
          <dt>
            <span id="ocupation">Ocupation</span>
          </dt>
          <dd>{personEntity.ocupation}</dd>
          <dt>
            <span id="parent">Parent</span>
          </dt>
          <dd>{personEntity.parent}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{personEntity.state}</dd>
          <dt>Type Id</dt>
          <dd>{personEntity.typeIdId ? personEntity.typeIdId : ''}</dd>
          <dt>Gender</dt>
          <dd>{personEntity.genderId ? personEntity.genderId : ''}</dd>
          <dt>Neighborhood</dt>
          <dd>{personEntity.neighborhoodId ? personEntity.neighborhoodId : ''}</dd>
          <dt>City</dt>
          <dd>{personEntity.cityId ? personEntity.cityId : ''}</dd>
          <dt>Birthplace</dt>
          <dd>{personEntity.birthplaceId ? personEntity.birthplaceId : ''}</dd>
          <dt>Nacionality</dt>
          <dd>{personEntity.nacionalityId ? personEntity.nacionalityId : ''}</dd>
          <dt>City Exp</dt>
          <dd>{personEntity.cityExpId ? personEntity.cityExpId : ''}</dd>
          <dt>Rh</dt>
          <dd>{personEntity.rhId ? personEntity.rhId : ''}</dd>
          <dt>Eps</dt>
          <dd>{personEntity.epsId ? personEntity.epsId : ''}</dd>
          <dt>Relation</dt>
          <dd>{personEntity.relationId ? personEntity.relationId : ''}</dd>
          <dt>Courses</dt>
          <dd>
            {personEntity.courses
              ? personEntity.courses.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === personEntity.courses.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ person }: IRootState) => ({
  personEntity: person.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);
