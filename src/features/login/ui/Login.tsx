import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../shared/hooks/hooksReduxUpdate';

import { fetchRespToken } from '../loginSlice';

import login from './Login.module.scss';

function Login() {
  const dispatch = useAppDispatch();

  return (
    <div className={login.login}>
      <h1 className={login.title}>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .min(5, 'Минимум 5 букв')
            .max(20, 'Максимум 20 букв')
            .required('*Обязательное поле'),
          password: Yup.string().required('*Обязательное поле'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(fetchRespToken(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className={login.form}>
            <Field
              type="username"
              name="username"
              className={login.field}
              placeholder="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className={login.errorMessage}
            />
            <Field
              type="password"
              name="password"
              className={login.field}
              placeholder="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={login.errorMessage}
            />
            <button type="submit" disabled={isSubmitting} className={login.btn}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
