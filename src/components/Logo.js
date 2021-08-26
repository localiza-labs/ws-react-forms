import React from 'react';
import logoSvg from '../assets/svg/logo.svg';

function Logo({ height = '22px' }){
  return <img src={logoSvg} height={height} alt={'Logo Localiza'} />;
}

export default Logo;
