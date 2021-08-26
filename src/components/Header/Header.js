import React from 'react';
import Logo from '../Logo';
import { HeaderStyled } from './styles';

function Header(props){
    return (
        <HeaderStyled {...props}>
            <Logo />
        </HeaderStyled>
    )
}

export default Header;
