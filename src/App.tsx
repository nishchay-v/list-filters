import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import CardList from "./components/CardList";
import { CatalogItem, Filter } from "./types";
import { getFilteredData } from "./helpers";

function App() {
  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  useEffect(() => {
    fetch("/catalog.json")
      .then((response) => response.ok && response.json())
      .then(({ data } = []) => {
        setCatalogData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredCatalogData = getFilteredData(catalogData, activeFilters);

  return (
    <div className="App">
      <header className="sticky top-0 z-1000 shadow-md">
        <FilterBar
          catalogData={catalogData}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </header>
      <main>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CardList cardItems={filteredCatalogData} />
        )}
      </main>
    </div>
  );
}

export default App;
