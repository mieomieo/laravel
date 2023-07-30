import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deletePost } from "../../action/post";
import PropTypes from "prop-types";

// const PostItem = ({post:{id,title,content,date,offsetY},deletePost}) => {
const PostItem = (props) => {
    // console.log(" Item1111111:", props);
    const {
        post: { title, content, date, offsetY, id },
        deletePost,
    } = props;

    return (
        <Fragment>
            <div style={{ margin: "10px" }}>
                <ul className="collection mx-3">
                    <li className="collection-item avatar">
                        <i className="material-icons circle">person_outline</i>
                        <span className="title">{title}</span>
                        <p>{content}</p>
                        <p>{date}</p>
                        <p>{offsetY}</p>

                        <a
                            className="secondary-content waves-effect waves-light  red darken-3 btn"
                            onClick={() => {
                                deletePost(id);
                            }}
                        >
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};
PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(PostItem);
