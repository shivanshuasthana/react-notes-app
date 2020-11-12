import React from 'react';
import { mount } from 'enzyme';
import Login from './Login';

test('should render Login component correctly', () => {
    const wrapper = mount(
        <Login />
    );
    expect(wrapper).toMatchSnapshot();
});