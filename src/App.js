import React from "react";
import "./App.css";

import Header from "./component/header";
import SearchFilter from "./component/searchFilter";
import ContentList from "./component/contentList";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchFilter />
      <ContentList />
    </div>
  );
}

export default App;
