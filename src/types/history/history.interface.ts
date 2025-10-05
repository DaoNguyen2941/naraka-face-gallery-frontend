export enum ActivityAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export enum ActivityModule {
  CHARACTER = 'character',
  FACE = 'face',
  ALBUM = 'album',
  TAG = 'tag',
}

export interface ParamGetHistory {
  page?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
  adminId?: string;
  module?: ActivityModule;
  action?: ActivityAction;
  fromDate?:string; // YYYY-MM-DD
  toDate?: string;  // YYYY-MM-DD
}

export const defaultHistoryParams: ParamGetHistory = {
  page: 1,
  take: 15,
};
