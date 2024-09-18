import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/hooks/hooksReduxUpdate';

import InteractionWithDocuments from '../../../features/interactionWithDocuments';
import { updateToken } from '../../../features/login/loginSlice';
import serverConfig from '../../../processes/server.tokens';

function ListDocuments() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: any) => state.loginReducer.tokenAuth);

  useEffect(() => {
    dispatch(updateToken());
  }, []);

  // Comparison of the received token with the list of tokens for authorization
  const confirmationOfCurrent = serverConfig.find(item => item === token);

  return confirmationOfCurrent !== undefined ? (
    <InteractionWithDocuments />
  ) : (
    <Navigate to="/login" />
  );
}

export default ListDocuments;
