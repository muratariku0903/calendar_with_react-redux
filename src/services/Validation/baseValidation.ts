export type BaseRuleItems = {
    required?: true;
    length?: {
        min?: number;
        max?: number;
    },
    regex?: {
        pattern: RegExp;
        meaning: string;
    }
};

export type BaseValidationRules = {
    [key: string]: {
        name: string;
        rules: BaseRuleItems;
    },
}

export type ErrorMessages = Record<string, string>;

export class BaseValidation {
    private baseValidationRules?: BaseValidationRules;
    protected validationMessages: ErrorMessages;

    constructor(baseValidationRules?: BaseValidationRules) {
        this.validationMessages = {};
        this.baseValidationRules = baseValidationRules;
    }

    public validate<T>(form: T): ErrorMessages {
        if (!this.baseValidationRules) throw ('バリデーションルールを設定してください');

        for (const key in form) {
            if (!(key in this.baseValidationRules)) continue;

            key as keyof BaseValidationRules;
            const itemName = this.baseValidationRules[key].name;
            const items = this.getValidationItems(form[key]);
            
            if ('required' in this.baseValidationRules[key].rules && this.isEmpty(items)) {
                this.validationMessages[key] = `${itemName} は必須です`;
                break;
            }

            validate_loop:
            for (const item of items) {
                for (const ruleName in this.baseValidationRules[key].rules) {
                    if (ruleName === 'required') {
                        const validationMessage = this.validateRequired<T[keyof T]>(itemName, item);
                        if (!this.isEmpty(validationMessage)) {
                            this.validationMessages[key] = validationMessage;
                            break validate_loop;
                        }
                    }

                    if (ruleName === 'length') {
                        const max = this.baseValidationRules[key].rules.length?.max;
                        const min = this.baseValidationRules[key].rules.length?.min;
                        const validationMessage = this.isNumber(item) || this.isString(item) ? this.validateLength(itemName, item, min, max) : '';
                        if (!this.isEmpty(validationMessage)) {
                            this.validationMessages[key] = validationMessage;
                            break validate_loop;
                        }
                    }

                    if (ruleName === 'regex') {
                        const regex = this.baseValidationRules[key].rules.regex;
                        if (!regex) continue;
                        const validationMessage = this.isString(item) ? this.validateRegex(itemName, item, regex.pattern, regex.meaning) : '';
                        if (!this.isEmpty(validationMessage)) {
                            this.validationMessages[key] = validationMessage;
                            break validate_loop;
                        }
                    }
                }
            }
        }

        return this.validationMessages;
    }

    public isEmptyErrorMessages(errorMessages: ErrorMessages): boolean {
        return this.isEmpty(errorMessages);
    }

    protected validateRequired<T>(itemName: string, item: T): string {
        return this.isEmpty<T>(item) ? `${itemName} は必須です` : '';
    }

    protected validateLength(itemName: string, item: number | string, min?: number, max?: number): string {
        if (this.isEmpty(item)) return '';
        switch (typeof (item)) {
            case 'number':
                return this.validateNumSize(item, itemName, max, min);
            case 'string':
                return this.validateStrLen(item, itemName, max, min);
        }
    }

    protected validateRegex(itemName: string, item: string, pattern: RegExp, meaning: string): string {
        if (this.isEmpty(item)) return '';
        return !item.match(pattern) ? `${itemName}は${meaning} の形式でお願いします` : '';
    }

    protected validateStrLen(str: string, itemName: string, max?: number, min?: number): string {
        const len = str.length;
        if (max !== undefined && min !== undefined && (len > max || len < min)) {
            return `${itemName}は${min}文字以上${max} 文字以下です`;
        } else if (max !== undefined && len > max) {
            return `${itemName}は${max} 文字以下です`;
        } else if (min !== undefined && len < min) {
            return `${itemName}は${min} 文字以上です`;
        }
        return '';
    }

    protected validateNumSize(num: number, itemName: string, max?: number, min?: number): string {
        if (max !== undefined && min !== undefined && (num > max || num < min)) {
            return `${itemName}は${min}以上${max} 以下です`;
        } else if (max !== undefined && num > max) {
            return `${itemName}は${max} 以下です`;
        } else if (min !== undefined && num < min) {
            return `${itemName}は${min} 以上です`;
        }
        return '';
    }

    private getValidationItems<T>(maybeArrItem: T | T[]): T[] {
        return this.isArr(maybeArrItem) ? maybeArrItem : [maybeArrItem];;
    }

    protected isEmpty<T>(item: T): boolean {
        switch (typeof (item)) {
            case 'string':
                return item.trimLeft() === '';
            case 'number':
                return false;
            case 'object':
                return Object.keys(item).length === 0;
            default:
                return true;
        }
    }

    protected isString(item: any): item is string {
        return typeof (item) === 'string';
    }

    protected isNumber(item: any): item is number {
        return typeof (item) === 'number';
    }

    protected isArr<T>(maybeArr: T | T[]): maybeArr is T[] {
        return Array.isArray(maybeArr);
    }
}
