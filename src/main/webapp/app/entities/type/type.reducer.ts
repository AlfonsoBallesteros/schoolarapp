import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IType, defaultValue } from 'app/shared/model/type.model';

export const ACTION_TYPES = {
  FETCH_TYPE_LIST: 'type/FETCH_TYPE_LIST',
  FETCH_TYPE: 'type/FETCH_TYPE',
  CREATE_TYPE: 'type/CREATE_TYPE',
  UPDATE_TYPE: 'type/UPDATE_TYPE',
  DELETE_TYPE: 'type/DELETE_TYPE',
  RESET: 'type/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TypeState = Readonly<typeof initialState>;

// Reducer

export default (state: TypeState = initialState, action): TypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TYPE):
    case REQUEST(ACTION_TYPES.UPDATE_TYPE):
    case REQUEST(ACTION_TYPES.DELETE_TYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TYPE):
    case FAILURE(ACTION_TYPES.CREATE_TYPE):
    case FAILURE(ACTION_TYPES.UPDATE_TYPE):
    case FAILURE(ACTION_TYPES.DELETE_TYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_TYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TYPE):
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

const apiUrl = 'api/types';

// Actions

export const getEntities: ICrudGetAllAction<IType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TYPE_LIST,
    payload: axios.get<IType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TYPE,
    payload: axios.get<IType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TYPE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
