import React from "react";
import { FaBook, FaQuestionCircle } from "react-icons/fa";
import { formatElapsedTime } from "../helpers";
import { CatalogItem } from "../types";

interface CardListProps {
    cardItems: CatalogItem[];
}

const CardList: React.FC<CardListProps> = ({ cardItems }) => {
  return (
    <div className="p-4 flex-col items-center">
      {cardItems.map((item) => (
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
              {item.type === "Course" ? "Course" : "Quiz"} by {item.createdBy} •{" "}
              {formatElapsedTime(item.lastEdited)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
