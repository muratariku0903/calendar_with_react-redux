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

export type ErrorMessages = Record<string, string>;

export class BaseValidation {
    protected validationMessages: ErrorMessages;

    constructor() {
        this.validationMessages = {};
    }

    protected validateRequired<T>(itemName: string, item: T): string {
        return this.isEmpty<T>(item) ? `${itemName}は必須です` : '';
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
        return !item.match(pattern) ? `${itemName}は${meaning}の形式でお願いします` : '';
    }

    protected validateStrLen(str: string, itemName: string, max?: number, min?: number): string {
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

    protected validateNumSize(num: number, itemName: string, max?: number, min?: number): string {
        if (max !== undefined && min !== undefined && (num > max || num < min)) {
            return `${itemName}は${min}以上${max}以下です`;
        } else if (max !== undefined && num > max) {
            return `${itemName}は${max}以下です`;
        } else if (min !== undefined && num < min) {
            return `${itemName}は${min}以上です`;
        }
        return '';
    }

    protected isEmptyErrorMessages(errorMessages: ErrorMessages): boolean {
        return this.isEmpty(errorMessages);
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
}
