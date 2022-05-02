import { BaseValidation, BaseRuleItems, ErrorMessages } from "./baseValidation";
import { User } from '../../redux/stateTypes';


type ExpansionRuleItems = {
    emailConflict?: true;
}

type AuthValidationRuleItems = BaseRuleItems & ExpansionRuleItems;

export type AuthValidationRules = {
    [key: string]: {
        name: string;
        rules: AuthValidationRuleItems;
    },
};

export class AuthValidation extends BaseValidation {
    private validationRules: AuthValidationRules;
    private users?: User[];

    constructor(validationRules: AuthValidationRules, users?: User[]) {
        super();
        this.validationRules = validationRules;
        this.users = users;
    }

    public validate<T>(items: T): ErrorMessages {
        for (const key in items) {
            if (!(key in this.validationRules)) continue;

            key as keyof AuthValidationRules;
            const item = items[key];
            const itemName = this.validationRules[key].name;
            for (const ruleName in this.validationRules[key].rules) {
                if (ruleName === 'required') {
                    const validationMessage = super.validateRequired<T[keyof T]>(itemName, item);
                    if (!this.isEmpty(validationMessage)) {
                        this.validationMessages[key] = validationMessage;
                        break;
                    }
                }

                if (ruleName === 'length') {
                    const max = this.validationRules[key].rules.length?.max;
                    const min = this.validationRules[key].rules.length?.min;
                    const validationMessage = this.isNumber(item) || this.isString(item) ? this.validateLength(itemName, item, min, max) : '';
                    if (!this.isEmpty(validationMessage)) {
                        this.validationMessages[key] = validationMessage;
                        break;
                    }
                }

                if (ruleName === 'regex') {
                    const regex = this.validationRules[key].rules.regex;
                    if (!regex) continue;
                    const validationMessage = this.isString(item) ? this.validateRegex(itemName, item, regex.pattern, regex.meaning) : '';
                    if (!this.isEmpty(validationMessage)) {
                        this.validationMessages[key] = validationMessage;
                        break;
                    }
                }

                if (ruleName === 'emailConflict' && this.users) {
                    const validationMessage = this.isString(item) ? this.validateEmailConflict(item, this.users) : '';
                    if (!this.isEmpty(validationMessage)) {
                        this.validationMessages[key] = validationMessage;
                        break;
                    }
                }
            }
        }
        return this.validationMessages;
    }

    public isEmptyErrorMessages(errorMessages: Record<string, string>): boolean {
        return super.isEmptyErrorMessages(errorMessages);
    }

    private validateEmailConflict(item: string, users: User[]): string {
        for (const user of users) if (item === user.email) return '入力されたメールアドレスは既に存在します';
        return '';
    }
}
