import { useAppDispatch } from '../../../shared/hooks/hooksReduxUpdate';

import ListDocuments from '../../../widgets/listDocuments';
import { deleteToken } from '../../../features/login/loginSlice';

import homePage from './HomePage.module.scss';

function HomePage() {
  const dispatch = useAppDispatch();

  // Logout function
  type Logout = () => void;
  const logout: Logout = () => {
    dispatch(deleteToken());
  };

  return (
    <div className={homePage.home}>
      <button type="button" onClick={logout} className={homePage.btn}>
        Exit
      </button>
      <div className={homePage.list}>
        <ListDocuments />
      </div>
    </div>
  );
}

export default HomePage;
