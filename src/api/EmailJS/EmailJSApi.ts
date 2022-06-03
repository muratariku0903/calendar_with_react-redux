import emailjs from '@emailjs/browser';
import { EmailJSResponseStatus } from '@emailjs/browser';
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from './config';
import { EmailTemplateParams } from './types';


const send = (form: EmailTemplateParams): Promise<EmailJSResponseStatus> => {
    return new Promise((resolve, reject) => {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                resolve(result);
            }, (error) => {
                reject(error.text);
            });
    });

}

export const emailApi = { send };
