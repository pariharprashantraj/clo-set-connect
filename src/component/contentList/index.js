import React, { useEffect, useRef, useCallback, useState } from "react";
import { ContentListContainer } from "../styles/contentList.styles";
import ItemCard from "./itemCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/closetAction";

const ContentList = () => {
  const dispatch = useDispatch();
  const { data, status, page } = useSelector((state) => state.apiData);
  const { searchText, filterOptions } = useSelector((state) => state.filter);
  const observer = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const [itemsToRender, setItemsToRender] = useState([]); // Local state to manage displayed items

  // **🔹 Fetch initial data**
  useEffect(() => {
    dispatch(fetchData(1)); // Load first page
  }, [dispatch]);

  // **🔹 Update itemsToRender whenever data or filters change**
  useEffect(() => {
    const updatedData = data.filter((item) => {
      // **1️⃣ Apply Pricing Filters**
      const { paid, free, viewOnly } = filterOptions;
      const isPaid = paid && item.pricingOption === 0;
      const isFree = free && item.pricingOption === 1;
      const isViewOnly = viewOnly && item.pricingOption === 2;

      // **2️⃣ Apply Search Filter**
      const matchesSearch =
        searchText.trim() === "" ||
        item.title.toLowerCase().includes(searchText.toLowerCase());

      // **3️⃣ Combine Search and Pricing Filters**
      return (
        (isPaid || isFree || isViewOnly || (!paid && !free && !viewOnly)) &&
        matchesSearch
      );
    });

    setItemsToRender(updatedData); // Update the state with filtered items
  }, [data, searchText, filterOptions]); // Runs whenever data, search, or filters change

  // **🔹 Infinite Scrolling Logic**
  const lastItemRef = useCallback(
    (node) => {
      if (status === "loading" || isFetching) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsFetching(true);
            dispatch(fetchData(page + 1)).finally(() => setIsFetching(false));
          }
        },
        { rootMargin: "300px" }
      );

      if (node) observer.current.observe(node);
    },
    [status, dispatch, page, isFetching]
  );

  // **🔹 Render Content List**
  const renderContentList = () => {
    return (
      <>
        {itemsToRender.length > 0 ? (
          itemsToRender.map((item, index) => {
            const isLastItem = index === itemsToRender.length - 1; // Check if this is the last item
            const uniqueKey = item.uniqueKey; // Use the unique key generated in the thunk

            return (
              <ItemCard
                ref={isLastItem ? lastItemRef : null} // Attach ref only to the last item
                key={uniqueKey} // Use the unique key
                content={item}
              />
            );
          })
        ) : (
          <p>No items found.</p> // Handle case when no items match
        )}

        {/* **🔹 Show Skeletons at Bottom While Fetching New Data** */}
        {isFetching &&
          new Array(3)
            .fill(null)
            .map((_, index) => (
              <ItemCard key={`skeleton-${index}`} content={null} />
            ))}
      </>
    );
  };

  return <ContentListContainer>{renderContentList()}</ContentListContainer>;
};

export default ContentList;
