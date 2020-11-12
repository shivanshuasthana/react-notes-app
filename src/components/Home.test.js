import React from 'react';
import { mount } from 'enzyme';
import {Home} from './Home';

test('should render Home component correctly', () => {
    const notesMock = [
        {
            title: 'Test1',
            content: 'Testing1'
        },
        {
            title: 'Test2',
            content: 'Testing2'
        }
    ]

    const wrapper = mount(
        <Home login={true} notes={notesMock}/>
    );
    expect(wrapper).toMatchSnapshot();
});