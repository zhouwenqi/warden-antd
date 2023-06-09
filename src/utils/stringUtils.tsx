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
        id:158820382,
        uid:'jackma',
        nickName:'马邦德',
        deptName: '研发部',
        deptId: 25,
        postName: '前端工程师',
        postId: 14,
        createDate: new Date(),
        loginDate: new Date(),
        face:'/images/face.png',
        authoritys: ['order:payment:statistics','monitoring','visits','add:adslots','add:adslots','modify:adslots','dept:manager','user:add','user:modify','user:delete'],
        roles: ['manager','dev'],
        roleName:'管理员',
        gender:'男',
        mobile:'180****2938',
        loginTotal:13729,
        loginIp:'202.98.173.95',        
        birthday:'2010/10/13',
        email:'superman@gmail.com',
        isRoot:false
    }
    if(local!='zh-CN'){
        userInfo.nickName = 'JackMa'
        userInfo.roleName = 'Manager'
        userInfo.deptName = 'R&D'
        userInfo.postName = 'Development'
        userInfo.gender = 'Male'
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