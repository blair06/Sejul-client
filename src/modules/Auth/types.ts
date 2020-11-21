import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IUser } from '../../api/interfaces';

export type AuthAction = ActionType<typeof actions>;

export type AuthState = {
	user: {
		loading: Boolean;
		error: Error | null;
		data: IUser | null;
	};
};
