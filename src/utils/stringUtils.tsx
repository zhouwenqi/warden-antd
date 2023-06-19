/**
 * 伪代码获取当前用户信息
 * @param local 语言
 * @returns 
 */
const getLocalUser = async (locale?:string) =>{
    if(!locale){
        locale = window.localStorage.getItem('umi_locale') as string
    }
    
    try{
        const result = await fetch('/api/user/current', {
        method:'GET',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "locale":locale
        }})            
        return result.json()
    }
    catch{          
        return undefined
    }    
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