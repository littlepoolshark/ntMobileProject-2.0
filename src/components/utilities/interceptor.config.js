const interceptor={
    isNumber:value => value.replace(/[^\d\.]/g,""),
    isInteger:value => value.replace(/[^\d]/g,""),
    maxLength:(value,n) => value.slice(0,n),
    keepDecimalPlaceOf:() => {}
}
export default interceptor;