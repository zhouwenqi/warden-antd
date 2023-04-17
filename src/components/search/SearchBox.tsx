import React from "react";
import { Button, Input, Space, SpaceProps,Select } from "antd";
import styles from "./SearchBox.less";
const { Option } = Select;
const SearchBox=()=>{    
    return(
        <div className={styles.box}>
            <Space.Compact block>
                <Select defaultValue="Zhejiang">
                    <Option value="Zhejiang">Zhejiang</Option>
                    <Option value="Jiangsu">Jiangsu</Option>
                </Select>           
                <Input />  
                <Button type="primary">Search</Button>              
            </Space.Compact>            
        </div>
    )
}

export default SearchBox