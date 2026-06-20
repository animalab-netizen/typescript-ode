import type { BaseViewModel } from "./BaseViewModel.js";

export interface Controller<TViewModel extends BaseViewModel> {
  readonly viewModel: TViewModel;
}

