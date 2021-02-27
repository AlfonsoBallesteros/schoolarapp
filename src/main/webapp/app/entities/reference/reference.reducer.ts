import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReference, defaultValue } from 'app/shared/model/reference.model';

export const ACTION_TYPES = {
  FETCH_REFERENCE_LIST: 'reference/FETCH_REFERENCE_LIST',
  FETCH_REFERENCE: 'reference/FETCH_REFERENCE',
  CREATE_REFERENCE: 'reference/CREATE_REFERENCE',
  UPDATE_REFERENCE: 'reference/UPDATE_REFERENCE',
  DELETE_REFERENCE: 'reference/DELETE_REFERENCE',
  RESET: 'reference/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReference>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ReferenceState = Readonly<typeof initialState>;

// Reducer

export default (state: ReferenceState = initialState, action): ReferenceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REFERENCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REFERENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REFERENCE):
    case REQUEST(ACTION_TYPES.UPDATE_REFERENCE):
    case REQUEST(ACTION_TYPES.DELETE_REFERENCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REFERENCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REFERENCE):
    case FAILURE(ACTION_TYPES.CREATE_REFERENCE):
    case FAILURE(ACTION_TYPES.UPDATE_REFERENCE):
    case FAILURE(ACTION_TYPES.DELETE_REFERENCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REFERENCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_REFERENCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REFERENCE):
    case SUCCESS(ACTION_TYPES.UPDATE_REFERENCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REFERENCE):
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

const apiUrl = 'api/references';

// Actions

export const getEntities: ICrudGetAllAction<IReference> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_REFERENCE_LIST,
    payload: axios.get<IReference>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IReference> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REFERENCE,
    payload: axios.get<IReference>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReference> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REFERENCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReference> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REFERENCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReference> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REFERENCE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
