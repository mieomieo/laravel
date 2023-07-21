import { storage } from "../../fake.ts";
import React, { useState } from "react";
import styles from "../TimelineList/TimelineList.module.css";

export type NodeItemPropsType = {
  id: string;
  title: string;
  content: string;
  createAt: number;
  handleDelete: (id: string) => void;
  offsetY: number;
  handleEdit: (id: string, payload: NodeItemPayload) => void;
};
export type NodeItemPayload = {
  editedTitle: string;
  editedContent: string;
  editedDate: number | undefined;
};

function NodeItem(props: NodeItemPropsType) {
  const [isEditing, setIsEditing] = useState(true);
  const [editedDate, setEditedDate] = useState();
  const [isEditedOffsetY, setIsEditedOffsetY] = useState<boolean>(false);
  const [editedOffsetY, setEditedOffsetY] = useState<number>(0);
  const [isHidenNodeItem, setIsHidenNodeItem] = useState<boolean>(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // Function
  const handleEdit = () => {
    console.log("click btn");
    //validate
    if (editedDate) {
      setIsEditedOffsetY(true);
      if (editedDate > 0 && editedDate < 1095 && editedDate != undefined) {
        setEditedOffsetY((editedDate * 1000) / 1095);
        props.handleEdit(props.id, {
          editedTitle,
          editedContent,
          editedDate,
        });
        setIsEditing(false);
      } else {
        props.handleEdit(props.id, {
          editedTitle,
          editedContent,
          editedDate,
        });
        setIsEditing(false);
      }
    } else {
      props.handleEdit(props.id, {
        editedTitle,
        editedContent,
        editedDate,
      });
      setIsEditing(false);
    }
  };
  const handleCancel = () => {
    if (editedTitle === "" && editedContent === "") {
      console.log("click cancel");
      props.handleDelete(props.id);
    } else {
      setIsEditing(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {

      handleEdit();
    }
  };
  const handleHidenItem = () => {
    setIsHidenNodeItem(!isHidenNodeItem);
    console.log(isHidenNodeItem);
  };
  return (
    <>
      <li
        className={isHidenNodeItem ? styles["li-hidden"] : ""}
        style={{
          marginTop:
            isEditedOffsetY == true
              ? `${editedOffsetY}px`
              : `${props.offsetY}px`,
        }}
      >
        {isEditing ? (
          <div>
            {/* <p>id:{props.id}</p> */}
            <div>
              Title:
              <input
                className={styles["edit-item"]}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div>
              Content:
              <input
                className={styles["edit-item"]}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <span className={styles.circle}></span>
            <span className={styles.line}></span>
            <span onKeyDown={handleKeyDown} className={styles.date}>
              <input
                placeholder="Day: "
                type="number"
                onChange={(e) => setEditedDate(parseInt(e.target.value))}
              />
            </span>
            <a className={styles["save-btn"]} onClick={() => handleEdit()}>
              Save
            </a>
            <a className={styles["cancel-btn"]} onClick={() => handleCancel()}>
              Cancel
            </a>
          </div>
        ) : (
          <div>
            <div className={styles["item-container"]}>
              <p>id:{props.id}</p>
              <h3 className={styles.title}>{props.title}</h3>
              <p>{props.content}</p>
              <a onClick={() => setIsEditing(true)}>Edit &gt;</a>
              <a
                onClick={() => props.handleDelete(props.id)}
                className={styles["delete-btn"]}
              >
                Delete
              </a>
              <span className={styles.line}></span>
              <span className={styles.date}>
                Day: {isEditedOffsetY ? editedDate : props.createAt}
              </span>
            </div>

            <span
              style={{ display: "block !important" }}
              onClick={handleHidenItem}
              className={styles.circle}
            ></span>
          </div>
        )}
      </li>
    </>
  );
}

export default NodeItem;
