import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deletePost } from "../../action/post";
import PropTypes from "prop-types";

// const PostItem = ({post:{title,content,date,offsetY},deletePost}) => {
const PostItem = (props) => {
 
    return (
        <Fragment>
            <div>
                <ul className="collection mx-3">
                    <li className="collection-item avatar">
                        {/* <i className="material-icons circle">person_outline</i> */}
                        <span className="title">{props.post.title}</span>
                        <p>{props.post.content}</p>
                        <p>{props.post.date}</p>
                        <p>{props.post.offsetY}</p>

                        <a
                            className="secondary-content waves-effect waves-light  red darken-3 btn"
                        onClick={()=>{
                            console.log('aaa');
                            
                            deletePost(props.post.id)
                        }}
                        >
                            <i className="material-icons left">
                                {/* delete_forever */}
                            </i>
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </Fragment>

    )
}
PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
}

export default connect(null,{deletePost})(PostItem);
