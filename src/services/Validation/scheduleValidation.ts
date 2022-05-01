import { BaseValidation, BaseRuleItems, ErrorMessages } from "./baseValidation";
import { Schedule } from '../../redux/stateTypes';


type ExpansionRuleItems = {
    timeLogical?: true;
    timeConflict?: true;
}

type ScheduleValidationRuleItems = BaseRuleItems & ExpansionRuleItems;

export type ScheduleValidationRules = {
    [key: string]: {
        name: string;
        rules: ScheduleValidationRuleItems;
    },
};

type Time = { start: number, end: number };

export class ScheduleValidation extends BaseValidation {
    private validationRules: ScheduleValidationRules;
    private schedules?: Schedule[];

    constructor(validationRules: ScheduleValidationRules, schedules?: Schedule[]) {
        super();
        this.validationRules = validationRules;
        this.schedules = schedules;
    }

    public validate<T>(items: T): ErrorMessages {
        for (const key in items) {
            if (!(key in this.validationRules)) continue;

            key as keyof ScheduleValidationRules;
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

                if (ruleName === 'timeLogical') {
                    const validationMessage = this.isTime(item) ? this.validateTimeLogical(itemName, item) : '';
                    if (!this.isEmpty(validationMessage)) {
                        this.validationMessages[key] = validationMessage;
                        break;
                    }
                }

                if (ruleName === 'timeConflict' && this.schedules) {
                    const validationMessage = this.isTime(item) ? this.validateTimeConflict(itemName, item, this.schedules) : '';
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

    private validateTimeLogical(itemName: string, item: Time): string {
        return item.start >= item.end ? `${itemName}は開始が終了より早い必要があります` : '';
    }

    public validateTimeConflict(itemName: string, item: Time, schedules: Schedule[]): string {
        for (const { time: { start, end } } of schedules) {
            if (
                ((item.start <= start) && (end <= item.end))
                ||
                ((start < item.start) && (item.start < end))
                ||
                ((start < item.end) && (item.end < end))
            ) return `${itemName}が既にある予定と時間が重複しています`;
        }
        return '';
    }

    private isTime = (item: any): item is Time => {
        return Boolean((item as Time).start && (item as Time).end);
    }
}
