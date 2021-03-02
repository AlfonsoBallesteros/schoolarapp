import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEnrollment, defaultValue } from 'app/shared/model/enrollment.model';

export const ACTION_TYPES = {
  FETCH_ENROLLMENT_LIST: 'enrollment/FETCH_ENROLLMENT_LIST',
  FETCH_ENROLLMENT: 'enrollment/FETCH_ENROLLMENT',
  CREATE_ENROLLMENT: 'enrollment/CREATE_ENROLLMENT',
  UPDATE_ENROLLMENT: 'enrollment/UPDATE_ENROLLMENT',
  DELETE_ENROLLMENT: 'enrollment/DELETE_ENROLLMENT',
  RESET: 'enrollment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEnrollment>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EnrollmentState = Readonly<typeof initialState>;

// Reducer

export default (state: EnrollmentState = initialState, action): EnrollmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENROLLMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENROLLMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ENROLLMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ENROLLMENT):
    case REQUEST(ACTION_TYPES.DELETE_ENROLLMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ENROLLMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENROLLMENT):
    case FAILURE(ACTION_TYPES.CREATE_ENROLLMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ENROLLMENT):
    case FAILURE(ACTION_TYPES.DELETE_ENROLLMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENROLLMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENROLLMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENROLLMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ENROLLMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENROLLMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/enrollments';

// Actions

export const getEntities: ICrudGetAllAction<IEnrollment> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ENROLLMENT_LIST,
    payload: axios.get<IEnrollment>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEnrollment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENROLLMENT,
    payload: axios.get<IEnrollment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEnrollment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENROLLMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEnrollment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENROLLMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEnrollment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENROLLMENT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
