/* eslint-disable indent */
import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react'
import { TextInput, Text, Button, Alert } from 'react-native'
export default class App extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
          password: yup
            .string()
            .min(6, 'Password must have at least 6 characters')
            .required('Password is required')
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit
        }) => (
            <Fragment>
              <TextInput
                testID={'input_email'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="E-mail"
              />
              {touched.email && errors.email && (
                <Text testID={'error_email'} style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
              )}
              <TextInput
                testID={'input_password'}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text testID={'error_password'} style={{ fontSize: 10, color: 'red' }}>
                  {errors.password}
                </Text>
              )}
              <Button
                testID={'button_submit'}
                title="Sign In"
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </Fragment>
          )}
      </Formik>
    )
  }
}
