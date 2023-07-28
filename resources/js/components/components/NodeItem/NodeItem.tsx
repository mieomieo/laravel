import { storage } from "../../fake.js";
import React, { useState } from "react";
import styles from "../TimelineList/TimelineList.module.css";
import { connect } from "react-redux";
import { addPost } from "../../action/post";

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

const NodeItem = (props: NodeItemPropsType, { addPost }) => {
    const [isEditing, setIsEditing] = useState(true);
    const [isEditedOffsetY, setIsEditedOffsetY] = useState<boolean>(false);
    const [editedDate, setEditedDate] = useState();
    const [editedOffsetY, setEditedOffsetY] = useState<number>(0);
    const [isHidenNodeItem, setIsHidenNodeItem] = useState<boolean>(false);

    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        date: 0,
        offsetY: 0,
    });
    const { title, content, date, offsetY } = formData;

    // Function
    const handleEdit = () => {
        console.log("click btn");
        //validate
        if (editedDate) {
            setIsEditedOffsetY(true);
            if (
                editedDate > 0 &&
                editedDate < 1095 &&
                editedDate != undefined
            ) {
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
        addPost(formData);
        setFormData({ title: "", content: "", date: 0, offsetY: 0 });
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
    const onSubmit = (e) => {
        console.log("onsubmit");

        // e.preventDefault();
        // addPost(formData);
        // setFormData({ title: "", content: "", date: 0, offsetY: 0 });
    };
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    <form
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
                    >
                        <div>
                            <div>
                                Title:
                                <input
                                    className={styles["edit-item"]}
                                    type="text"
                                    name="title"
                                    value={title}
                                    // onChange={(e) =>
                                    //     setEditedTitle(e.target.value)
                                    // }
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div>
                                Content:
                                <input
                                    className={styles["edit-item"]}
                                    value={content}
                                    name="content"
                                    onChange={(e) => onChange(e)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <span className={styles.circle}></span>
                            <span className={styles.line}></span>
                            <span
                                onKeyDown={handleKeyDown}
                                className={styles.date}
                            >
                                <input
                                    placeholder="Day: "
                                    type="number"
                                    onChange={(e) =>
                                        setEditedDate(parseInt(e.target.value))
                                    }
                                />
                            </span>
                            <a
                                className={styles["save-btn"]}
                                onClick={() => handleEdit()}
                            >
                                <button
                                    className="btn waves-effect waves-light ml-2"
                                    type="submit"
                                    name="action"
                                >
                                    Submit
                                   
                                </button>
                                {/* Save */}
                            </a>
                            <a
                                className={styles["cancel-btn"]}
                                onClick={() => handleCancel()}
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
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
                                Day:{" "}
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
        </>
    );
};
const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { addPost })(NodeItem);
