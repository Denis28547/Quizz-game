import React from "react";
import Questions from "./Questions";
import Startpage from "./Startpage";

function App() {
  const [nextPage, setNextPage] = React.useState(false);

  function changePage() {
    setNextPage((prevState) => !prevState);
  }

  return (
    <div>
      {nextPage ? <Questions /> : <Startpage changePage={changePage} />}
    </div>
  );
}

export default App;
