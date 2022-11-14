import { Button,Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import yayJpg from '../assets/yay.jpg';

export default function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <div>
        <img src={yayJpg} width="388" />
        
      </div>    
      <div>
        <Space>
        <Link to={'/login'}>Login</Link>
        <Link to={'/Main'}>Main</Link>
        <Link to={'/Docs'}>Docs</Link>
        </Space>
      </div> 
      <div>
        To get started, edit <code>pages/index.tsx</code> and save to reload...
      </div>
    </div>
  );
}
