import { observable, action, computed  } from "mobx";

export default class GlobalStore {
    @observable globalText;

    constructor(){
        this.globalText="this is some txt from GlobalStore";
    }
}