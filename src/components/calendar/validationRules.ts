import { ScheduleValidationRules } from '../../services/Validation/scheduleValidation';

export const rules: ScheduleValidationRules = {
    title: {
        name: 'タイトル',
        rules: {
            required: true,
        }
    },
    time: {
        name: '予定の時間',
        rules: {
            required: true,
            timeLogical: true,
            timeConflict: true,
        }
    },
    description: {
        name: '説明',
        rules: {
            length: {
                max: 300,
            }
        }
    }
}
