import type { BaseViewModel } from "./BaseViewModel.js";
import type { Controller } from "./Controller.js";

export type ControllerFactory<TViewModel extends BaseViewModel> = () => Controller<TViewModel>;

