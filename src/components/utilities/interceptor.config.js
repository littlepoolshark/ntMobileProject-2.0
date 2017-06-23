const interceptor = {
    isNumber: value => value.replace(/[^\d\.]/g, ""),
    isInteger: value => value.replace(/[^\d]/g, ""),
    isPhoneNo: value => value.replace(/[^\d]/g, "").slice(0,11),
    maxLength: (value, n) => value.slice(0, n),
    keepDecimalPlaceOf: (value, n) => {
        value = value.replace(/[^\d\.]/g, "");
        if (value === ".") {
            value = "";
        }
        if (value.indexOf(".") > -1) {//如果是小数点后的位数大于两位的小数,则将其截断为小数点后一位
            let arr = value.split(".");
            let integerSection = arr[0];//整数位
            let decimalsSection = arr[1];//小数位
            let otherSection = arr[2];//其余部分
            if (arr.length === 2) {//用户输入合法的小数的时候
                if (!!decimalsSection && decimalsSection.length > n) {
                    value = integerSection + "." + decimalsSection.slice(0, n);
                }
            }else{//用户输入非法的小数的时候
                if(decimalsSection === ""){
                    value = integerSection + ".";
                }else if(otherSection === ""){
                    value = integerSection + "." + decimalsSection;
                }  
            }
        }

        return value;
    }
}
export default interceptor;