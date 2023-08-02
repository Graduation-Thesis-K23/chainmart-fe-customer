import { ASYNC_STATUS, useAppSelector } from "~/redux";

function useLoading(): boolean {
  const { status } = useAppSelector((state) => state.user);

  return status === ASYNC_STATUS.LOADING || status === ASYNC_STATUS.IDLE;
}

export default useLoading;
