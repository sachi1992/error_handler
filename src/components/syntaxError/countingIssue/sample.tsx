import { useState, useEffect } from "react";

import { ErrorHandler } from "../../../errorHandler";

import Ex1 from "./ex1";
import Ex2 from "./ex2";

const Sample = (): JSX.Element => {
  const [person, setPerson] = useState({});

  useEffect(() => {
    setPerson({
      fn: "Livon",
      ln: "AB",
    });
  }, []);

  return (
    <div>
      <ErrorHandler>
        <Ex1 Person={person} />
        <Ex2 />
      </ErrorHandler>
    </div>
  );
};

export default Sample;
