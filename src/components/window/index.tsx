import { Drawer } from 'antd';
import React, { useImperativeHandle, forwardRef, MutableRefObject, useState,Ref } from 'react';
import { BaseWindowProps, WindowProps } from './typings';

const Window=(props:WindowProps)=>{
    
    return(
        <Drawer {...props} />
    )
}
export default Window