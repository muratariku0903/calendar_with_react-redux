import { BaseValidationRules } from '../../../../services/Validation/baseValidation';

export const rules: BaseValidationRules = {
    emailTitle: {
        name: 'タイトル',
        rules: {
            required: true,
        }
    },
    emailMessage: {
        name: '説明',
        rules: {
            length: {
                max: 300,
            }
        }
    },
    emailTos: {
        name: 'メールアドレス',
        rules: {
            required: true,
            regex: {
                pattern: /.+@.+\..+/,
                meaning: 'RFC準拠',
            }
        }
    }
}
