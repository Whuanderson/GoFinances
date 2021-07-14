import React from 'react';
import { render } from  '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {
   it('should have correctly placeholder in input user name', () => {
   const { getByPlaceholderText } = render(<Profile />);
  
   const inputName = getByPlaceholderText('Nome')
  
   expect(inputName.props.placeholder).toBeTruthy();
  
  });
  
  it('should be load user data', () => {
    const { getByTestId } = render (<Profile/>);
  
    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');
  
    expect(inputName.props.value).toEqual('whuand');
    expect(inputSurname.props.value).toEqual('marinho')
  
  });
  
  it('should exist title correctly', () =>{
    const { getByTestId } = render(<Profile />);
  
    const textTtile = getByTestId('text-title');
    
    expect(textTtile.props.children).toContain('Perfil')
  });  
});
