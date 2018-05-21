import validator from "./validator.config";
import typeOf from "./typeOf";

export default class Validator {
    constructor(checker) {
        this.checker = checker;
    }

    formCheckResult() {
        let formCheckResult = {
            success: true,
            errorMsg: ""
        };

        let fields = Object.keys(this.checker);

        for (let i = 0; i < fields.length; i++) {
            let rules = this.checker[fields[i]];

            for (let j = 0; j < rules.length; j++) {
                let currRule = rules[j].rule;
                let fieldValue = this[fields[i]];
                let isPassed = true;

                if (typeOf(currRule) === "string") {
                    if (currRule.indexOf(":")) {
                        let splitArr = currRule.split(":");
                        isPassed = validator[splitArr[0]](fieldValue, splitArr[1]);
                    } else {
                        isPassed = validator[splitArr[0]](fieldValue);
                    }
                }
                if (typeOf(currRule) === "function") {
                    isPassed = currRule(fieldValue);
                }

                if (!isPassed) {
                    formCheckResult.success = false;
                    formCheckResult.errorMsg = rules[j].errorMsg;
                    break;
                }
            }
        }

        return formCheckResult;
    }

}