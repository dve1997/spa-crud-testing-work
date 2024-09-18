import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../shared/hooks/hooksReduxUpdate';

import { fetchCreateDocument } from '../../../features/interactionWithDocuments/interactionWithDocumentsSlisce';

import createDocument from './CreateDocument.module.scss';

function CreateDocument() {
  const dispath = useAppDispatch();

  return (
    <div className={createDocument.body}>
      <h1 className={createDocument.title}>Create document</h1>
      <Formik
        initialValues={{
          companySigDate: '',
          companySignatureName: '',
          documentName: '',
          documentStatus: '',
          documentType: '',
          employeeNumber: '',
          employeeSigDate: '',
          employeeSignatureName: '',
          id: '',
        }}
        validationSchema={Yup.object().shape({
          companySignatureName: Yup.string().required('*Обязательное поле'),
          documentName: Yup.string().required('*Обязательное поле'),
          documentStatus: Yup.string().required('*Обязательное поле'),
          documentType: Yup.string().required('*Обязательное поле'),
          employeeNumber: Yup.string().required('*Обязательное поле'),
          employeeSignatureName: Yup.string().required('*Обязательное поле'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values.companySigDate = new Date().toISOString();
          values.employeeSigDate = new Date().toISOString();
          values.id = uuidv4();
          dispath(fetchCreateDocument(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className={createDocument.form}>
            <div className={createDocument.wrap}>
              <h3 className={createDocument.subtitle}>companySignatureName</h3>
              <Field
                type="text"
                name="companySignatureName"
                className={createDocument.field}
                placeholder="companySignatureName"
              />
              <ErrorMessage
                name="companySignatureName"
                component="div"
                className={createDocument.errorMessage}
              />
            </div>
            <div className={createDocument.wrap}>
              <h3 className={createDocument.subtitle}>documentName</h3>
              <Field
                type="text"
                name="documentName"
                className={createDocument.field}
                placeholder="documentName"
              />
              <ErrorMessage
                name="documentName"
                component="div"
                className={createDocument.errorMessage}
              />
            </div>
            <div className={createDocument.wrap}>
              <h3 className={createDocument.subtitle}>documentStatus</h3>
              <Field
                type="text"
                name="documentStatus"
                className={createDocument.field}
                placeholder="documentStatus"
              />
              <ErrorMessage
                name="documentStatus"
                component="div"
                className={createDocument.errorMessage}
              />
            </div>
            <div className={createDocument.wrap}>
              <h3 className={createDocument.subtitle}>documentType</h3>
              <Field
                type="text"
                name="documentType"
                className={createDocument.field}
                placeholder="documentType"
              />
              <ErrorMessage
                name="documentType"
                component="div"
                className={createDocument.errorMessage}
              />
            </div>
            <div className={createDocument.wrap}>
              <h3 className={createDocument.subtitle}>employeeNumber</h3>
              <Field
                type="text"
                name="employeeNumber"
                className={createDocument.field}
                placeholder="employeeNumber"
              />
              <ErrorMessage
                name="employeeNumber"
                component="div"
                className={createDocument.errorMessage}
              />
            </div>
            <div className={createDocument.wrap}>
              <h3 className={createDocument.subtitle}>employeeSignatureName</h3>
              <Field
                type="text"
                name="employeeSignatureName"
                className={createDocument.field}
                placeholder="employeeSignatureName"
              />
              <ErrorMessage
                name="employeeSignatureName"
                component="div"
                className={createDocument.errorMessage}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={createDocument.btn}
            >
              Create document
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateDocument;
