import { ActionTypes } from '../../actionTypes';

type ShowLoaderAction = {
    type: ActionTypes.SHOW_LOADER;
}

export const showLoader = (): ShowLoaderAction => {
    return { type: ActionTypes.SHOW_LOADER };
};

type HideLoaderAction = {
    type: ActionTypes.HIDE_LOADER;
}

export const hideLoader = (): HideLoaderAction => {
    return { type: ActionTypes.HIDE_LOADER };
};

export type LoaderActions = ShowLoaderAction | HideLoaderAction;
