import { storage } from "../../fake.js";
import React, { useState, Fragment, useEffect } from "react";
import styles from "../TimelineList/TimelineList.module.css";
import { connect } from "react-redux";
import { getPosts, addPost, deletePost, updatePost } from "../../action/post";
import PropTypes from "prop-types";

export type NodeItemPropsType = {
    data: {
        id: number;
        title: string;
        content: string;
        createAt: number;
        offsetY: number;
    };
};

const NodeItem = (props) => {
    // console.log("item props:", props);

    const { updatePost, addPost, deletePost, isFirstLoad } = props;
    const { id, content, title, offsetY, date } = props.data;
    const [isEditing, setIsEditing] = useState(false);
    console.log("title:", title);

    useEffect(() => {
        // Khi isEditing thay đổi, ta kiểm tra nếu title rỗng, thì đặt isEditing thành true
        if (props.data.title === "") {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, []);
    const [isEditedOffsetY, setIsEditedOffsetY] = useState<boolean>(false);
    const [isHidenNodeItem, setIsHidenNodeItem] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        editedTitle: "",
        editedContent: "",
        editedDate: 0,
        editedOffsetY: 0,
    });

    const { editedTitle, editedContent, editedDate, editedOffsetY } = formData;
    const handleEdit = async (e) => {
        e.preventDefault();
        // console.log("formData:", formData);
        await updatePost(id, formData);
        // console.log("await update");
        setIsEditing(false);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleEdit(e);
        }
    };
    const handleHidenItem = () => {
        setIsHidenNodeItem(!isHidenNodeItem);
        console.log(isHidenNodeItem);
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        await deletePost(id);
    };
    return (
        <Fragment>
            <li
                className={isHidenNodeItem ? styles["li-hidden"] : ""}
                style={{
                    marginTop:
                        isEditedOffsetY == true
                            ? `${editedOffsetY}px`
                            : `${offsetY}px`,
                }}
            >
                {isEditing ? (
                    <div>
                        <div>
                            Title:
                            <input
                                className={styles["edit-item"]}
                                type="text"
                                name="editedTitle"
                                value={editedTitle}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div>
                            Content:
                            <input
                                className={styles["edit-item"]}
                                value={editedContent}
                                name="editedContent"
                                onChange={(e) => onChange(e)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <span className={styles.circle}></span>
                        <span className={styles.line}></span>
                        <span onKeyDown={handleKeyDown} className={styles.date}>
                            <input
                                placeholder="Day: "
                                type="number"
                                name="editedDate"
                                onChange={(e) => onChange(e)}
                            />
                        </span>
                        <a className={styles["save-btn"]} onClick={handleEdit}>
                            Save
                        </a>
                        <a
                            className={styles["cancel-btn"]}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </a>
                    </div>
                ) : (
                    <div>
                        <div className={styles["item-container"]}>
                            {/* <p>id:{props.id}</p> */}
                            <h3 className={styles.title}>{title}</h3>
                            <p>{content}</p>
                            <a onClick={() => setIsEditing(true)}>Edit &gt;</a>
                            <a
                                onClick={handleDelete}
                                className={styles["delete-btn"]}
                            >
                                Delete
                            </a>
                            <span className={styles.line}></span>
                            <span className={styles.date}>
                                Day:{date}
                                {isEditedOffsetY ? editedDate : props.createAt}
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
        </Fragment>
    );
};

NodeItem.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost, deletePost, updatePost })(NodeItem);
