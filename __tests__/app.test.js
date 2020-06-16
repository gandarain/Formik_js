/* eslint-disable no-undef */
/**
 * @format
 */

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import App from '../App'
import { fireEvent, render, wait, cleanup } from '@testing-library/react-native'

jest.setTimeout(30000)
configure({ adapter: new Adapter(), disableLifecycleMethods: true })
const appWrapper = shallow(<App />)
afterEach(cleanup)

describe('App', () => {
  it('should renders correctly', async () => {
    renderer.create(<App />)
  })

  it('should renders text input email and password', () => {
    expect(appWrapper.find('[id="input_email"]').exists())
    expect(appWrapper.find('[id="input_password"]').exists())
  })

  test('should be show error if value email is not valid', async () => {
    const { getByTestId } = render(<App />)
    const input = getByTestId('input_email')
    fireEvent.changeText(input, 'ganda.com')
    fireEvent.blur(input)
    expect(getByTestId('input_email').props.value).toEqual('ganda.com')
    await wait(() => {
      expect(getByTestId('error_email').props.children).toEqual('Enter a valid email')
    })
  })

  test('should be show error if value password is not valid', async () => {
    const { getByTestId } = render(<App />)
    const input = getByTestId('input_password')
    fireEvent.changeText(input, '1111')
    fireEvent.blur(input)
    expect(getByTestId('input_password').props.value).toEqual('1111')
    await wait(() => {
      expect(getByTestId('error_password').props.children).toEqual('Password must have at least 6 characters')
    })
  })
})