let validator={
    isRequired:value => value !== "",
    minLength:(value,len) => value.length >= len,
    maxLength:(value,len) => value.length <= len,
    isPhoneNo:value => /^[0-9]*$/.test(value) && value.length === 11
}
export default validator;