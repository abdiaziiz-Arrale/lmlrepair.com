import React from 'react';
import { ReactNode } from 'react';

function CustomContainer({ children }: { children: ReactNode }) {
   return <div className='2xl:mx-auto 2xl:container'>{children}</div>;
}

export default CustomContainer;
