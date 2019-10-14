import React from 'react';
import SimpleAsset from './components/SimpleAsset'
import mongoose from 'mongoose';

import { IAction, ActionType } from './framework/IAction';
import { IWindow } from './framework/IWindow'
declare let window: IWindow;

interface IProps {
  stateCounter: number
}
export interface IAssetData {
  _id: string;
  asset_name: string;
  asset_value: number;
  asset_amount: number;
  asset_sumAmount: number;
}

interface IState {
}

export interface IAssetAction extends IAction {
  asset: IAssetData
}

export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: any) {
    console.log("new App component will be initialized");
    super(props);

    this.handleCreateAsset = this.handleCreateAsset.bind(this);
  }

  render() {
    window.CS.log("App --> render()")
    return (
      <div>
        <p> {window.CS.getUIState().counter}</p>
        <h1>simple asset management application</h1>
        <p>to create a new asset click this button:&nbsp;
          <button onClick={this.handleCreateAsset}>create asset</button>
        </p>
        <table>
          <tbody>
            <tr><th>description</th><th>value</th><th>amountItems</th><th>amountValue</th><th>action</th></tr>
            {window.CS.getBMState().assets.map(asset => <SimpleAsset key={asset._id} asset={asset} edit={false}  />)}
            <tr>
            <td>Total Items: {window.CS.getBMState().assets.length}</td> 
            <td></td> 
            <td>{window.CS.getUIState().sumItems}</td>
            <td>Total Worth: {window.CS.getUIState().sumMoney}</td>
            <td id="blackTd"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  handleCreateAsset() {
    console.log("handleCreateAsset invoked");
    const newAsset: IAssetData = {
      _id: mongoose.Types.ObjectId().toString(),
      asset_name: "",
      asset_value: 0,
      asset_amount: 1,
      asset_sumAmount: 0
    }
    const action: IAssetAction = {
      type: ActionType.create_asset,
      asset: newAsset
    }
    window.CS.clientAction(action);
  }



}
