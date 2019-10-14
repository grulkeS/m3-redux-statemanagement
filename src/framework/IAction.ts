export enum ActionType {
    INIT = "@@INIT",
    create_asset = "create_asset",
    update_asset = "update_asset",
    delete_asset = "delete_asset",
    render_test = "render_test",
    calc_sum = "calc_sum"
}
export interface IAction {
    type: ActionType;
}
