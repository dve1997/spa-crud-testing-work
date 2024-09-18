import Authorization from '../../../widgets/authorization';

import loginPage from './LoginPage.module.scss';
import logo from '../../../shared/icons/dve.jpg';

function LoginPage() {
  return (
    <div className={loginPage.login}>
      <img src={logo} alt="logo" />
      <Authorization />
    </div>
  );
}

export default LoginPage;
