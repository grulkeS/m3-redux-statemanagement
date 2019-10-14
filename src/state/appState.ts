export interface IUI{
    counter: number;
    sumMoney: number;
    sumItems: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
}

interface IAssetData {
    _id: string;
    asset_name: string;
    asset_value: number;
    asset_amount: number;
    asset_sumAmount: number;
  }

export interface IBM{
    assets:IAssetData[]
}

export interface IState{
    UI:IUI;
    BM:IBM;
}

// initial state 
export const initial:IState = {
	UI: {
        sumMoney: 0,
        sumItems: 0,
		counter: 0,
		loggedIn: false,
		waitingForResponse: false,
	},
	BM: {
        assets:[]
	}
};
