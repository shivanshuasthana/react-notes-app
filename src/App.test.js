import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('MyComponent', () => {
  it('should render App component correctly', () => {
    const component = shallow(<App debug />);
  
    expect(component).toMatchSnapshot();
  });
});