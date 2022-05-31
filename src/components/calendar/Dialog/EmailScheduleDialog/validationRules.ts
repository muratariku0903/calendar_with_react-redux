import { BaseValidationRules } from '../../../../services/Validation/baseValidation';

export const rules: BaseValidationRules = {
    title: {
        name: 'タイトル',
        rules: {
            required: true,
        }
    },
    description: {
        name: '説明',
        rules: {
            length: {
                max: 300,
            }
        }
    },
    email: {
        name: 'メールアドレス',
        rules: {
            required: true,
            regex: {
                pattern: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                meaning: '半角英数字をそれぞれ1種類以上含む8文字以上100文字以下',
            }
        }
    }
}
