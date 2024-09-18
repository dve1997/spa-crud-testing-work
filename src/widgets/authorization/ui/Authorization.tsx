import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../shared/hooks/hooksReduxUpdate';

import Login from '../../../features/login';
import Spinner from '../../../shared/ui/spinner/index';
import serverConfig from '../../../processes/server.tokens';

import authorization from './Authorization.module.scss';

function Authorization() {
  const statusLoadingToken = useAppSelector(
    (state: any) => state.loginReducer.statusLoadingToken,
  );
  const token = useAppSelector((state: any) => state.loginReducer.tokenAuth);

  // Comparison of the received token with the list of tokens for authorization
  const confirmationOfCurrent = serverConfig.find(
    (item: any) => item === token,
  );

  return confirmationOfCurrent !== undefined ? (
    <Navigate to="/" />
  ) : statusLoadingToken === 'loaded' && token === undefined ? (
    <>
      <Login />
      <div className={authorization.error}>
        The user with the specified login and password does not exist.
      </div>
    </>
  ) : statusLoadingToken === 'loaded' && token === null ? (
    <Login />
  ) : (
    <Spinner />
  );
}

export default Authorization;
