import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './enrollment.reducer';
import { IEnrollment } from 'app/shared/model/enrollment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnrollmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnrollmentDetail = (props: IEnrollmentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { enrollmentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Enrollment [<b>{enrollmentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="peaceSafeFile">Peace Safe File</span>
          </dt>
          <dd>{enrollmentEntity.peaceSafeFile}</dd>
          <dt>
            <span id="academicFile">Academic File</span>
          </dt>
          <dd>{enrollmentEntity.academicFile}</dd>
          <dt>
            <span id="docStudentFile">Doc Student File</span>
          </dt>
          <dd>{enrollmentEntity.docStudentFile}</dd>
          <dt>
            <span id="docDadFile">Doc Dad File</span>
          </dt>
          <dd>{enrollmentEntity.docDadFile}</dd>
          <dt>
            <span id="docMomFile">Doc Mom File</span>
          </dt>
          <dd>{enrollmentEntity.docMomFile}</dd>
          <dt>
            <span id="docTutorFile">Doc Tutor File</span>
          </dt>
          <dd>{enrollmentEntity.docTutorFile}</dd>
          <dt>
            <span id="academicPeriod">Academic Period</span>
          </dt>
          <dd>{enrollmentEntity.academicPeriod}</dd>
          <dt>
            <span id="year">Year</span>
          </dt>
          <dd>{enrollmentEntity.year}</dd>
          <dt>
            <span id="obs">Obs</span>
          </dt>
          <dd>{enrollmentEntity.obs}</dd>
          <dt>
            <span id="workingDay">Working Day</span>
          </dt>
          <dd>{enrollmentEntity.workingDay}</dd>
          <dt>
            <span id="enrollModality">Enroll Modality</span>
          </dt>
          <dd>{enrollmentEntity.enrollModality}</dd>
          <dt>
            <span id="legacy">Legacy</span>
          </dt>
          <dd>{enrollmentEntity.legacy ? 'true' : 'false'}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{enrollmentEntity.state}</dd>
          <dt>Work Shop</dt>
          <dd>{enrollmentEntity.workShopId ? enrollmentEntity.workShopId : ''}</dd>
          <dt>Grade Prox</dt>
          <dd>{enrollmentEntity.gradeProxId ? enrollmentEntity.gradeProxId : ''}</dd>
          <dt>Student</dt>
          <dd>{enrollmentEntity.studentId ? enrollmentEntity.studentId : ''}</dd>
        </dl>
        <Button tag={Link} to="/enrollment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/enrollment/${enrollmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ enrollment }: IRootState) => ({
  enrollmentEntity: enrollment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentDetail);
