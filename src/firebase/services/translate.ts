export const translateAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return '提供されたIDに対応する既存ユーザーが存在しません';

        case 'auth/invalid-password':
            return 'パスワードは6文字以上を指定する必要があります';

        case 'auth/invalid-email':
            return 'メールアドレスの形式に誤りがあります';

        case 'auth/email-already-exists':
            return '提供されたメールアドレスは既存のユーザーによって使用されています';

        case 'auth/wrong-password':
            return '提供されたパスワードが間違っています';

        case 'auth/user-disabled':
            return '指定されたユーザーは無効となっています';

        case 'auth/too-many-requests':
            return 'ログインに何度も失敗したため一時的にアカウントが無効無効なっています'

        case 'auth/internal-error':
            return 'リクエストの処理中に、認証サーバーで予期しないエラーが発生しました';

        default:
            return '';
    }
}

