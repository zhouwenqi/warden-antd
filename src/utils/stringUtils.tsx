/**
 * 伪代码获取当前用户信息
 * @param local 语言
 * @returns 
 */
const getLocalUser=(local?:string)=>{
    if(!local){
        local = window.localStorage.getItem('umi_locale') as string
    }
    var userInfo:Warden.SysUser = {
        id:15,
        uid:'jackma',
        nickName:'马邦德',
        deptName: '研发部',
        deptId: 25,
        postName: '前端工程师',
        postId: 14,
        createDate: new Date(),
        loginDate: new Date(),
        face:'/images/face.png',
        authoritys: ['xxx','ppp'],
        roles: ['manager','dev'],
        roleName:'管理员',
        isRoot:false
    }
    if(local!='zh-CN'){
        userInfo.nickName = 'JackMa'
        userInfo.roleName = 'Manager'
        userInfo.deptName = 'R&D'
        userInfo.postName = 'Development'  
    }
    return userInfo
}
export {getLocalUser}