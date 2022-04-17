export type ValidateRules = {
    [key: string]: {
        name: string;
        rules: {
            required?: true;
            length?: {
                min?: number;
                max?: number;
            },
            regex?: {
                pattern: RegExp;
                meaning: string;
            },
            time?: true;
        },
    },
};

type ErrorMessage = string;
export type ErrorMessages = Record<string, ErrorMessage>;
type Time = { start: number, end: number };

export class Validation {
    private validationRules: ValidateRules;

    constructor(validationRules: ValidateRules) {
        this.validationRules = validationRules;
    }

    public validate<T>(items: T): ErrorMessages {
        type ItemType = T[keyof T];
        const errorMessages: ErrorMessages = {};
        for (const key in items) {
            if (!this.existsKeyInValidationRules(key)) continue;

            key as keyof ValidateRules;
            const item = items[key];
            for (const ruleName in this.validationRules[key].rules) {
                if (ruleName === 'required') {
                    const errorMessage = this.validateRequired<ItemType>(key, item);
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'length') {
                    const errorMessage = typeof (item) === 'number' || typeof (item) === 'string' ? this.validateLength(key, item) : '';
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'regex') {
                    const errorMessage = typeof (item) === 'string' ? this.validateRegex(key, item) : '';
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'time') {
                    const errorMessage = this.isTime(item) ? this.validateTime(key, item) : '';
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }
            }
        }
        return errorMessages;
    }

    public isEmptyErrorMessages(errorMessages: ErrorMessages): boolean {
        return Object.keys(errorMessages).length === 0 && errorMessages.constructor === Object;
    }

    private validateRequired<T>(key: string, item: T): ErrorMessage {
        const itemName = this.validationRules[key]['name'];
        return this.isEmpty<T>(item) ? `${itemName}は必須です` : '';
    }

    private validateLength(key: string, item: number | string): ErrorMessage {
        if (this.isEmpty(item)) return '';
        const max = this.validationRules[key]['rules']['length']?.['max'];
        const min = this.validationRules[key]['rules']['length']?.['min'];
        const itemName = this.validationRules[key]['name'];
        switch (typeof (item)) {
            case 'number':
                return this.validateNumSize(item, itemName, max, min);
            case 'string':
                return this.validateStrLen(item, itemName, max, min);
        }
    }

    private validateRegex(key: string, item: string): ErrorMessage {
        if (this.isEmpty(item)) return '';
        const regex = this.validationRules[key]['rules']['regex'];
        const itemName = this.validationRules[key]['name'];
        return regex && !item.match(regex['pattern']) ? `${itemName}は${regex['meaning']}の形式でお願いします` : '';
    }

    private validateTime(key: string, item: Time): ErrorMessage {
        const itemName = this.validationRules[key]['name'];
        return item.start > item.end ? `${itemName}は開始が終了より早い必要があります` : '';
    }

    private validateStrLen(str: string, itemName: string, max?: number, min?: number): ErrorMessage {
        const len = str.length;
        if (max !== undefined && min !== undefined && (len > max || len < min)) {
            return `${itemName}は${min}文字以上${max}文字以下です`;
        } else if (max !== undefined && len > max) {
            return `${itemName}は${max}文字以下です`;
        } else if (min !== undefined && len < min) {
            return `${itemName}は${min}文字以上です`;
        }
        return '';
    }

    private validateNumSize(num: number, itemName: string, max?: number, min?: number): ErrorMessage {
        if (max !== undefined && min !== undefined && (num > max || num < min)) {
            return `${itemName}は${min}以上${max}以下です`;
        } else if (max !== undefined && num > max) {
            return `${itemName}は${max}以下です`;
        } else if (min !== undefined && num < min) {
            return `${itemName}は${min}以上です`;
        }
        return '';
    }

    private existsKeyInValidationRules(key: string): boolean {
        return key in this.validationRules;
    }

    private isEmpty<T>(item: T): boolean {
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

    private isTime = (item: any): item is Time => {
        return Boolean((item as Time).start && (item as Time).end);
    }
}
