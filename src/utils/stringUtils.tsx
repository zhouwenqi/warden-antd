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
const getTagColor=(tagName:string):string=>{
    var color="default"    
    switch(tagName.toUpperCase()){
        case "DELETE":
            color = "red"
            break
        case "CREATE":
        case "INSERT":
        case "ADD":
        case "PUBLISH":
            color = "blue"
            break
        case "JOIN":
            color = "green"
            break
        case "MODIFY":
        case "UPDATE":
        case "EDIT":
            color = "orange"
            break
        case "LOGIN":
            color = "purple"
            break
        case "VERIFY":
            color = "magenta"
            break
    }

    return color
}
const getNs=(list:any[],value:string):any=>{
        for(var i=0;i<list.length;i++){
        if(list[i].value==value){
            return list[i]
        }
    }
    return undefined
}
const getNsText=(list:any[],value:string):string=>{
    const item = getNs(list,value)
    return item!= undefined ? item.text : undefined
}
export {getLocalUser,getTagColor,getNsText,getNs}