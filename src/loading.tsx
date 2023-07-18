import { Spin } from "antd"

const LoadPage=()=>{
    return(
        <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Spin />
        </div>
    )
}

export default LoadPage