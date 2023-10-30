import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

export function useCustomSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}
