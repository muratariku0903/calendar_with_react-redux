type ValidateRulesKey = string;
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
type ErrorMessages = Record<string, ErrorMessage>;
// type ErrorMessages = Record<ValidateRules[keyof ValidateRules]['name'], ErrorMessage>;

export class Validation {
    private validationRules: ValidateRules;

    constructor(validationRules: ValidateRules) {
        this.validationRules = validationRules;
    }

    public validate(items: ValidateItems): ErrorMessages {
        const errorMessages: ErrorMessages = {};
        for (const key in items) {
            if (!this.existsKeyInValidationRules(key)) continue;

            const item = items[key as keyof ValidateItems];

            for (const ruleName in this.validationRules[key as keyof ValidateRules]['rules']) {
                if (ruleName === 'required') {
                    const errorMessage = this.validateRequired(key as keyof ValidateRules, item);
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'length') {
                    const errorMessage = this.validateLength(key as keyof ValidateRules, item);
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }

                if (ruleName === 'regex') {
                    const errorMessage = this.validateRegex(key as keyof ValidateRules, item);
                    if (!this.isEmpty(errorMessage)) {
                        errorMessages[key] = errorMessage;
                        break;
                    }
                }
            }
        }
        return errorMessages;
    }

    private validateRequired(key: keyof ValidateRules, item: ValidateItem): ErrorMessage {
        return this.isEmpty(item) ? `${this.validationRules[key]['name']}は必須です` : '';
    }

    private validateLength(key: keyof ValidateRules, item: ValidateItem): ErrorMessage {
        if (this.isEmpty(item)) return '';
        const max = this.validationRules[key]['rules']['length']?.['max'];
        const min = this.validationRules[key]['rules']['length']?.['min'];
        switch (typeof (item)) {
            case 'number':
                return this.validateNumSize(key, item, max, min);

            case 'string':
                return this.validateStrLen(key, item, max, min);
            default:
                return '';
        }
    }

    private validateStrLen(key: keyof ValidateRules, str: string, max?: number, min?: number): ErrorMessage {
        const len = str.length;
        if (max !== undefined && min !== undefined && (len > max || len < min)) {
            return `${this.validationRules[key]['name']}は${min}文字以上${max}文字以下です`;
        } else if (max !== undefined && len > max) {
            return `${this.validationRules[key]['name']}は${max}文字以下です`;
        } else if (min !== undefined && len < min) {
            return `${this.validationRules[key]['name']}は${min}文字以上です`;
        }
        return '';
    }

    private validateNumSize(key: keyof ValidateRules, num: number, max?: number, min?: number): ErrorMessage {
        if (max !== undefined && min !== undefined && (num > max || num < min)) {
            return `${this.validationRules[key]['name']}は${min}以上${max}以下です`;
        } else if (max !== undefined && num > max) {
            return `${this.validationRules[key]['name']}は${max}以下です`;
        } else if (min !== undefined && num < min) {
            return `${this.validationRules[key]['name']}は${min}以上です`;
        }
        return '';
    }

    private validateRegex(key: keyof ValidateRules, item: ValidateItem): ErrorMessage {
        if (this.isEmpty(item)) return '';
        const regex = this.validationRules[key]['rules']['regex'];
        switch (typeof (item)) {
            case 'string':
                return regex && !item.match(regex['pattern']) ? `${this.validationRules[key]['name']}は${regex['meaning']}の形式でお願いします。` : '';
            case 'number':
                return '値が正しくありません。';
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
