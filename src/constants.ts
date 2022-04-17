import { ValidateRules } from './services/validation';
export const weeks = ['日', '月', '火', '水', '木', '金', '土'];
export const sideMenuWidth = 240;
export const headerHeight = 64;
// ルールのキーもダイアログの入力項目名とに含まれる型定義
export const rules: ValidateRules = {
    name: {
        name: '名前',
        rules: {
            required: true,
        }
    },
    email: {
        name: 'メールアドレス',
        rules: {
            required: true,
            regex: {
                pattern: /.+@.+\..+/,
                meaning: 'メールアドレス'
            }
        }
    },
    password: {
        name: 'パスワード',
        rules: {
            required: true,
            regex: {
                pattern: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                meaning: '半角英数字をそれぞれ1種類以上含む8文字以上100文字以下',
            },
        },
    },
    title: {
        name: 'タイトル',
        rules: {
            required: true,
        }
    },
    time: {
        name: '時間',
        rules: {
            required: true,
            time: true,
        }
    },
};

