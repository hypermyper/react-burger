import React, { FC } from 'react';

const NavItem = ( icon: React.FC, title: string ) => {
    return (
      <>
        {icon}
        <span className={'ml-2'}>{title}</span>
      </>
    );
}

export default NavItem;