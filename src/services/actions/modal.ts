export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly content: boolean;
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
  readonly content: boolean;
}

export type TModalActions = 
| IOpenModalAction 
| ICloseModalAction;