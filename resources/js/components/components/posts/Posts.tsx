import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../action/post";

const Posts = ({ post: { posts } }) => {
    // useEffect(() => {
    //     getPosts();
    // }, [getPosts])
    // console.log("posts:",posts);
    return (
        <div>
            <div className="collection mx-3">
                <a href="#!" className="collection-item active">
                    Total Posts: {posts.length}
                </a>
            </div>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};
// Posts.propTypes = {
//     post: PropTypes.object.isRequired,
//     getPosts:PropTypes.func.isRequired,
// }

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps)(Posts);
