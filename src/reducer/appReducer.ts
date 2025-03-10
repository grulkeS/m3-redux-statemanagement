import { initial, IState } from '../state/appState'
import { IWindow } from '../framework/IWindow'
import { IAction, ActionType } from '../framework/IAction'
import { IAssetData, IAssetAction } from '../App';

declare let window: IWindow;

export const reducer = (state = initial, action: IAction) => {
    window.CS.log("2. ACTION:" + action.type);
    let newState: IState = state;
    newState = JSON.parse(JSON.stringify(state)) as IState;
    newState.UI.counter = state.UI.counter + 1;
    switch (action.type) {
        case ActionType.INIT:
            return newState;

        case ActionType.create_asset:
            const createAction = action as IAssetAction
            newState.BM.assets.push(createAction.asset);
            return newState;

        case ActionType.update_asset:
            let updateAction = action as IAssetAction;
            let assetToChange: IAssetData[] = newState.BM.assets.filter(asset => asset._id === updateAction.asset._id)
            console.log(assetToChange);
            assetToChange[0].asset_name = updateAction.asset.asset_name;
            assetToChange[0].asset_value = updateAction.asset.asset_value;
            assetToChange[0].asset_amount = updateAction.asset.asset_amount;
            assetToChange[0].asset_sumAmount = updateAction.asset.asset_sumAmount;
            return newState;

        case ActionType.delete_asset:
            console.log("Delete Action");
            let deleteAction = action as IAssetAction;
            let assetsToKeep: IAssetData[] = newState.BM.assets.filter(asset => asset._id !== deleteAction.asset._id)
            newState.BM.assets = assetsToKeep;
            return newState;

        case ActionType.calc_sum:
            console.log("calculating sum");
            newState.UI.sumMoney = state.BM.assets.reduce((acc, currVal) => {
                return acc+=currVal.asset_sumAmount;
            }, 0);
            newState.UI.sumItems = state.BM.assets.reduce((acc, currVal) => {
                return acc+=currVal.asset_amount;
            },0)
            return newState;

        default:
            window.CS.log("1. Error!!!!! no reducer defined");
            return newState;
    }
}

