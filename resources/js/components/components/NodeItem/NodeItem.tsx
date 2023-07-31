import { storage } from "../../fake.js";
import React, { useState, Fragment } from "react";
import styles from "../TimelineList/TimelineList.module.css";
import { connect } from "react-redux";
import { addPost,deletePost } from "../../action/post";
import PropTypes from "prop-types";

export type NodeItemPropsType = {

    id: string;
    title: string;
    content: string;
    createAt: number;
    offsetY: number;
};
export type NodeItemPayload = {
    editedTitle: string;
    handleEdit;
    editedContent: string;
    editedDate: number | undefined;
    editedOffsetY:number | undefined
};

const NodeItem = (props) => {
    console.log("item props:", props);
    
    const { addPost, deletePost,id,content,title,offsetY } = props;
    const [isEditing, setIsEditing] = useState(true);
    const [isEditedOffsetY, setIsEditedOffsetY] = useState<boolean>(false);
    const [isHidenNodeItem, setIsHidenNodeItem] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        editedTitle: "",
        editedContent: "",
        editedDate: undefined,
        editedOffsetY: undefined,
    });
    const { editedTitle, editedContent, editedDate, editedOffsetY } = formData;
    const handleEdit = (e)=>{
        e.preventDefault();
        addPost(formData);
        setFormData({ editedTitle: "", editedContent: "", editedDate: 0, editedOffsetY: 0 });
    }
    // Function
    // const abc = () => {

    //     //validate
    //     if (editedDate) {
    //         setIsEditedOffsetY(true);
    //         if (
    //             editedDate > 0 &&
    //             editedDate < 1095 &&
    //             editedDate != undefined
    //         ) {
    //             setEditedOffsetY((editedDate * 1000) / 1095);
    //             props.handleEdit(props.id, {
    //                 title,
    //                 content,
    //                 editedDate,
    //             });
    //             setIsEditing(false);
    //         } else {
    //             props.handleEdit(props.id, {
    //                 title,
    //                 content,
    //                 editedDate,
    //             });
    //             setIsEditing(false);
    //         }
    //     } else {
    //         props.handleEdit(props.id, {
    //             title,
    //             content,
    //             editedDate,
    //         });
    //         setIsEditing(false);
    //     }
    //     props.addPost(formData);
    //     setFormData({
    //         title: "",
    //         content: "",
    //         date: 0,
    //         offsetY: 0,
    //     });
    //     addPost(formData);
    //     setFormData({ title: "", content: "", date: 0, offsetY: 0 });
    // };
    const handleCancel = () => {
        if (editedTitle === "" && editedContent === "") {
            console.log("click cancel");
            deletePost(props.id);
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
        e.preventDefault();
        props.addPost(formData);
        setFormData({
            title: "",
            content: "",
            date: 0,
            offsetY: 0,
        });
    };
    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            // offsetY: props.offsetY,
        });
    return (
        <Fragment>
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
                        <span onKeyDown={handleKeyDown} className={styles.date}>
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
                            //  onClick={handleEdit}
                        >
                            Save
                        </a>
                        <a
                            className={styles["cancel-btn"]}
                            onClick={()=>{
                                deletePost(id)
                            }}
                        >
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
        </Fragment>
    );
};
const mapStateToProps = (state) => ({
    post: state.post,
});
NodeItem.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost,deletePost })(NodeItem);
