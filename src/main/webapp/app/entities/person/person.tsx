import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPersonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Person = (props: IPersonProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { personList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="person-heading">
        People
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Person
        </Link>
      </h2>
      <div className="table-responsive">
        {personList && personList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('surname')}>
                  Surname <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('birthdate')}>
                  Birthdate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneNumber')}>
                  Phone Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('district')}>
                  District <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('neighborhood')}>
                  Neighborhood <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('stratus')}>
                  Stratus <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address')}>
                  Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('rh')}>
                  Rh <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('disease')}>
                  Disease <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('disability')}>
                  Disability <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('relations')}>
                  Relations <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('stateCivil')}>
                  State Civil <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('profession')}>
                  Profession <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personList.map((person, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${person.id}`} color="link" size="sm">
                      {person.id}
                    </Button>
                  </td>
                  <td>{person.name}</td>
                  <td>{person.surname}</td>
                  <td>{person.birthdate}</td>
                  <td>{person.phoneNumber}</td>
                  <td>{person.district}</td>
                  <td>{person.neighborhood}</td>
                  <td>{person.stratus}</td>
                  <td>{person.address}</td>
                  <td>{person.rh}</td>
                  <td>{person.disease ? 'true' : 'false'}</td>
                  <td>{person.disability ? 'true' : 'false'}</td>
                  <td>{person.relations}</td>
                  <td>{person.stateCivil}</td>
                  <td>{person.profession}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${person.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${person.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${person.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No People found</div>
        )}
      </div>
      <div className={personList && personList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ person }: IRootState) => ({
  personList: person.entities,
  loading: person.loading,
  totalItems: person.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Person);
