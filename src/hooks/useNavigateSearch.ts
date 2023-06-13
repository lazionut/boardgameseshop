import {
  createSearchParams,
  NavigateFunction,
  useNavigate,
} from "react-router-dom";

const useNavigateSearch = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    pathname: string,
    params: { [key: string]: any },
  ) =>
    navigate({
      pathname,
      search: `?${createSearchParams(params)}`,
    });
};

export default useNavigateSearch;
