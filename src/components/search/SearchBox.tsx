import { Button, Input, Space, Select, Form } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useIntl } from "umi";
import styles from "./SearchBox.less";

/**
 * 搜索框组件
 * @param props 
 * @returns 
 */
const SearchBox=(props:SearchBoxProps)=>{
    const intl = useIntl()
    
    let selectElement:JSX.Element = <></>
    if(props.searchPropertyItems && props.searchPropertyItems.length > 0){
        let index = props.selectIndex != undefined ? props.selectIndex : 0  
        let defaultItem:IProperty = props.searchPropertyItems[index]
        if(props.selectItem){
            defaultItem = props.selectItem
        }
        selectElement=(<Form.Item noStyle name="searchProertyKey" initialValue={defaultItem?.value}><Select options={props.searchPropertyItems}></Select></Form.Item>)    
    }
    
    const inputSuffix = intl.formatMessage({id:'global.placeholder.input.suffix'})
    const inputPlaceholder = intl.formatMessage({id:'global.placeholder.input.prefix'}) + ' ' + inputSuffix
    const searchButton = props.searchButtonType=='icon' ? <Button htmlType="submit" type={props.searchButtonTheme} icon={<SearchOutlined />} /> : <Button htmlType="submit" type={props.searchButtonTheme}>{intl.formatMessage({id:'global.button.search'})}</Button>
    
    return(            
        <div className={styles.box}>
            <Space.Compact block>
                {selectElement}                
                <Form.Item noStyle name="searchProertyValue">
                    <Input.Search placeholder={inputPlaceholder} allowClear enterButton={searchButton} />
                </Form.Item>          
            </Space.Compact>
        </div>
    )
}

export default SearchBox