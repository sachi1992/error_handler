import { useEffect } from "react";

const Timeout = (): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      throw new Error("Time out with page crashing error");
    }, 2);
  }, []);

  return <div>Timeout Error</div>;
};

export default Timeout;
