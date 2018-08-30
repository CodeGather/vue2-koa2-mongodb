//使用的时候只需要import R from responseBeautifier,
//用R.set(data)即可获得返回的数据结构了
let responseBeautifier = new class{
    constructor(){
        this.response = {
            code:"",
            data:{},
            msg:""
        },
        this.StatusCode = new Map();
        this.registeStatusCode("0","OK");
        this.registeStatusCode("-1","ERROR");
    }
    registeStatusCode(code,description){
        this.StatusCode.set(code,description);
    }
    registeStatusCodes(arr){
        for(let [code,description] of arr){
            this.StatusCode.set(code,description);
        }
    }
    set(data,code="0",msg){
        code = code.toString()
        if(this.StatusCode.has(code)){
            return {
                code,
                data,
                msg:this.StatusCode.get(code),
            }
        }else{
            // log Something ,here is an unique code
            return {
                code,
                data,
                msg:msg||"Unresolvable Status Code :"+code,
            }
        }
    }
    error(code="-1",msg){
        code = code.toString()
        if(this.StatusCode.has(code)){
            return {
                code,
                data:{},
                msg:this.StatusCode.get(code),
            }
        }else{
            // log Something ,here is an unique code
            return {
                code,
                data:{},
                msg:msg||"Unresolvable Status Code :"+code,
            }
        }
    }
}();

//registe Status Code 

responseBeautifier.registeStatusCodes([
    ["404","NotFound"], 
    ["200","success"],
    ["500","fail"],
    ["1","等待中"],
])


export default responseBeautifier;