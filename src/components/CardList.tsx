import React, { useState } from "react";
import { FaBook, FaQuestionCircle } from "react-icons/fa";
import { formatElapsedTime } from "../helpers";
import { CatalogItem } from "../types";

interface CardListProps {
  cardItems: CatalogItem[];
}

const PAGE_ITEMS_LIMIT = 10;

const CardList: React.FC<CardListProps> = ({ cardItems }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(cardItems.length / PAGE_ITEMS_LIMIT);
  return (
    <div className="h-full">
      <div className="p-4 flex-col items-center">
        {cardItems &&
          cardItems
            .slice(
              currentPage * PAGE_ITEMS_LIMIT,
              (currentPage + 1) * PAGE_ITEMS_LIMIT
            )
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b border-gray-300"
              >
                <div className="mr-4">
                  {item.type === "Course" ? (
                    <FaBook className="text-xl" />
                  ) : (
                    <FaQuestionCircle className="text-xl" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-500">
                    {item.type === "Course" ? "Course" : "Quiz"} by{" "}
                    {item.createdBy} • {formatElapsedTime(item.lastEdited)}
                  </p>
                </div>
              </div>
            ))}
      </div>
      {pageCount && (
        <div className="flex space-x-8 w-full justify-center p-4  border-t-2 border-gray-800 sticky bottom-0 bg-white">
          {Array(pageCount)
            .fill(null)
            .map((_, pageIdx) => (
              <span
                role="button"
                onClick={() => setCurrentPage(pageIdx)}
                className={currentPage === pageIdx ? "underline" : ""}
              >
                {pageIdx + 1}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
