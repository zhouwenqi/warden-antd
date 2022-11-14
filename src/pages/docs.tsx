import { Button, ConfigProvider, Input, Space } from "antd";

const DocsPage = () => {
  const onChangeThemeHandler=()=>{
    ConfigProvider.config({
      theme:{
        primaryColor:'#ff6600'
      }
    })
  }
  return (
    <div>
      <div>This is umi docs.</div>
      <div>
        <Space>
          <Button onClick={()=>{onChangeThemeHandler()}}>Theme</Button>
          <Input />
        </Space>
        
      </div>
    </div>
  );
};

export default DocsPage;
