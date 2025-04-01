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
  const [itemsToRender, setItemsToRender] = useState([]);

  useEffect(() => {
    dispatch(fetchData(1));
  }, [dispatch]);

  useEffect(() => {
    const updatedData = data.filter((item) => {
      const { paid, free, viewOnly } = filterOptions;
      const isPaid = paid && item.pricingOption === 0;
      const isFree = free && item.pricingOption === 1;
      const isViewOnly = viewOnly && item.pricingOption === 2;

      const matchesSearch =
        searchText.trim() === "" ||
        item.title.toLowerCase().includes(searchText.toLowerCase());

      return (
        (isPaid || isFree || isViewOnly || (!paid && !free && !viewOnly)) &&
        matchesSearch
      );
    });

    setItemsToRender(updatedData);
  }, [data, searchText, filterOptions]);

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
            const isLastItem = index === itemsToRender.length - 1;
            const uniqueKey = item.uniqueKey;

            return (
              <ItemCard
                ref={isLastItem ? lastItemRef : null}
                key={uniqueKey}
                content={item}
              />
            );
          })
        ) : (
          <p>No items found.</p>
        )}

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
