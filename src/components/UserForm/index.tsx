import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './UserForm.css';

const UserSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Name must be 3 characters at minimum').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.number(),
});

class UserForm extends React.Component<any> {
  handleSubmit = (values: any, { setSubmitting }: any) => {
    const { handleUserFormSubmit } = this.props;
    // post logic
    console.log("VALUES", values)
    handleUserFormSubmit(true);
  };

  render() {
    return (
      <div className='user-form-container'>
        <div className='row mb-4'>
          <div className='col-lg-12 text-center'>
            <h4 className='text-secondary'>Submit to Continue...</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <Formik
              initialValues={{ name: '', email: '', phone: '' }}
              validationSchema={UserSchema}
              onSubmit={this.handleSubmit}>
              {({ values, touched, errors, isSubmitting, setSubmitting }) => (
                <Form autoComplete='off'>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <Field
                      type='text'
                      name='name'
                      className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage component='div' name='name' className='invalid-feedback' />
                  </div>

                  <div className='form-group mt-3'>
                    <label htmlFor='email'>Email</label>
                    <Field
                      type='email'
                      name='email'
                      autoComplete='off'
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage component='div' name='email' className='invalid-feedback' />
                  </div>

                  <div className='form-group mt-3'>
                    <label htmlFor='password'>Phone (optional)</label>
                    <Field
                      type='text'
                      name='phone'
                      autoComplete='off'
                      className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                    />
                  </div>

                  <button type='submit' className='mt-4 submit-btn btn btn-primary btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'Please wait...' : 'Submit'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
