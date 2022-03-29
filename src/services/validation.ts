export type ValidateRules = {
    [key: string]: {
        name: string,
        rules: {
            required?: true,
            length?: {
                min?: number,
                max?: number,
            },
            regex?: {
                pattern: RegExp;
                meaning: string;
            },
        },
    },
};

type ValidateItem = number | string | null;
export type ValidateItems = Record<string, ValidateItem>;

type ErrorMessage = string;
export type ErrorMessages = Record<string, ErrorMessage>;

export class Validation {
    private validationRules: ValidateRules;

    constructor(validationRules: ValidateRules) {
        this.validationRules = validationRules;
    }

    public validate(items: ValidateItems): ErrorMessages {
        const errorMessages: ErrorMessages = {};
        for (const key in items) {
            if (!this.existsKeyInValidationRules(key)) continue;

            key as keyof ValidateRules;
            const item = items[key];
            for (const ruleName in this.validationRules[key].rules) {
                if (ruleName === 'required') {
                    const errorMessage = this.validateRequired(key, item);
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'length') {
                    const errorMessage = this.validateLength(key, item);
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'regex') {
                    const errorMessage = this.validateRegex(key, item);
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

    private validateRequired(key: string, item: ValidateItem): ErrorMessage {
        const itemName = this.validationRules[key]['name'];
        return this.isEmpty(item) ? `${itemName}は必須です` : '';
    }

    private validateLength(key: string, item: ValidateItem): ErrorMessage {
        if (this.isEmpty(item)) return '';
        const max = this.validationRules[key]['rules']['length']?.['max'];
        const min = this.validationRules[key]['rules']['length']?.['min'];
        const itemName = this.validationRules[key]['name'];
        switch (typeof (item)) {
            case 'number':
                return `${itemName}は${this.validateNumSize(item, max, min)}です`;

            case 'string':
                return `${itemName}は${this.validateStrLen(item, max, min)}です`;
            default:
                return '';
        }
    }

    private validateStrLen(str: string, max?: number, min?: number): ErrorMessage {
        const len = str.length;
        if (max !== undefined && min !== undefined && (len > max || len < min)) {
            return `${min}文字以上${max}文字以下`;
        } else if (max !== undefined && len > max) {
            return `${max}文字以下`;
        } else if (min !== undefined && len < min) {
            return `${min}文字以上`;
        }
        return '';
    }

    private validateNumSize(num: number, max?: number, min?: number): ErrorMessage {
        if (max !== undefined && min !== undefined && (num > max || num < min)) {
            return `${min}以上${max}以下`;
        } else if (max !== undefined && num > max) {
            return `${max}以下`;
        } else if (min !== undefined && num < min) {
            return `${min}以上`;
        }
        return '';
    }

    private validateRegex(key: string, item: ValidateItem): ErrorMessage {
        if (this.isEmpty(item)) return '';
        const regex = this.validationRules[key]['rules']['regex'];
        const itemName = this.validationRules[key]['name'];
        switch (typeof (item)) {
            case 'string':
                return regex && !item.match(regex['pattern']) ? `${itemName}は${regex['meaning']}の形式でお願いします` : '';
            case 'number':
                return '値が正しくありません';
            default:
                return '';
        }
    }

    private existsKeyInValidationRules(key: string): boolean {
        return key in this.validationRules;
    }

    private isEmpty(item: ValidateItem): boolean {
        return item === '' || item === null;
    }
}
