/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoThunk } from '../../modules/Auth/thunks';

const useUserInfo = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.data === null) {
			dispatch(getUserInfoThunk());
		}
	}, []);
	return user.data;
};

export default useUserInfo;
