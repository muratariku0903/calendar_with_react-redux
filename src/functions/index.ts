export const omitObjectProperty = (obj: any) => (key: string) => {
    const clone = Object.assign({}, obj);
    delete clone[key];

    return clone;
}

export const deleteHtmlTagFromStr = (str: string) => {
    return str.replace(/(<([^>]+)>)/gi, '');
}
