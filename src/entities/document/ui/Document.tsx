import { ReactNode, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../shared/hooks/hooksReduxUpdate';

import {
  fetchDeleteDocument,
  deleteDocument,
  fetchUpdateDocument,
} from '../../../features/interactionWithDocuments/interactionWithDocumentsSlisce';

import document from './Document.module.scss';

interface PropsDocument {
  data: object;
}

interface Data {
  companySigDate: ReactNode;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: ReactNode;
  employeeSignatureName: string;
  id: string;
}

function Document(props: PropsDocument) {
  const dispatch = useAppDispatch();

  const [stateBth, setStateBtn] = useState(true);

  const { data } = props;
  const dataDocument = data as Data;
  const {
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
    id,
  } = dataDocument;

  return (
    <div className={document.body}>
      <h1 className={document.title}>Document</h1>
      <Formik
        initialValues={{
          companySigDate,
          companySignatureName,
          documentName,
          documentStatus,
          documentType,
          employeeNumber,
          employeeSigDate,
          employeeSignatureName,
          id,
        }}
        validationSchema={Yup.object().shape({
          companySigDate: Yup.string().required('*Обязательное поле'),
          companySignatureName: Yup.string().required('*Обязательное поле'),
          documentName: Yup.string().required('*Обязательное поле'),
          documentStatus: Yup.string().required('*Обязательное поле'),
          documentType: Yup.string().required('*Обязательное поле'),
          employeeNumber: Yup.string().required('*Обязательное поле'),
          employeeSigDate: Yup.string().required('*Обязательное поле'),
          employeeSignatureName: Yup.string().required('*Обязательное поле'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (stateBth) {
            dispatch(fetchDeleteDocument(values));
            dispatch(deleteDocument(values as any));
          } else {
            values.companySigDate = new Date().toISOString();
            values.employeeSigDate = new Date().toISOString();
            dispatch(fetchUpdateDocument(values));
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className={document.form}>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>companySigDate</h3>
              <div className={document.field}>{companySigDate}</div>
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>companySignatureName</h3>
              <Field
                type="text"
                name="companySignatureName"
                className={document.field}
                placeholder="companySignatureName"
              />
              <ErrorMessage
                name="companySignatureName"
                component="div"
                className={document.errorMessage}
              />
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>documentName</h3>
              <Field
                type="text"
                name="documentName"
                className={document.field}
                placeholder="documentName"
              />
              <ErrorMessage
                name="documentName"
                component="div"
                className={document.errorMessage}
              />
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>documentStatus</h3>
              <Field
                type="text"
                name="documentStatus"
                className={document.field}
                placeholder="documentStatus"
              />
              <ErrorMessage
                name="documentStatus"
                component="div"
                className={document.errorMessage}
              />
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>documentType</h3>
              <Field
                type="text"
                name="documentType"
                className={document.field}
                placeholder="documentType"
              />
              <ErrorMessage
                name="documentType"
                component="div"
                className={document.errorMessage}
              />
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>employeeNumber</h3>
              <Field
                type="text"
                name="employeeNumber"
                className={document.field}
                placeholder="employeeNumber"
              />
              <ErrorMessage
                name="employeeNumber"
                component="div"
                className={document.errorMessage}
              />
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>employeeSigDate</h3>
              <div className={document.field}>{employeeSigDate}</div>
            </div>
            <div className={document.wrap}>
              <h3 className={document.subtitle}>employeeSignatureName</h3>
              <Field
                type="text"
                name="employeeSignatureName"
                className={document.field}
                placeholder="employeeSignatureName"
              />
              <ErrorMessage
                name="employeeSignatureName"
                component="div"
                className={document.errorMessage}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={document.btn}
              onClick={() => {
                setStateBtn(true);
              }}
            >
              Delete
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={document.btn}
              onClick={() => {
                setStateBtn(false);
              }}
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Document;
