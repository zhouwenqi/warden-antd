import { Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { WindowProps } from './typings';

const Window=(props:WindowProps)=>{
    return(
        <Drawer {...props} />
    )
}
export default Window;