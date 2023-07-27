import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../action/post";

const Posts = ({post: {posts,loading},getPosts})=> {
    useEffect(() => {
        getPosts();
        // console.log(getPosts);
        
    }, [getPosts])

    return  loading ?
            (<div className="progress">
                  <div className="indeterminate"></div>
            </div>)
            :
            (
                <div>
                <div className="collection mx-3">
                 <a href="#!" className="collection-item active">
                    Total Posts: {posts.length}
                 </a>
                </div>
                {posts.map(post=>
                <PostItem  key={post.id} post={post}/>
                    )}
                </div>

        )

}
Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts:PropTypes.func.isRequired,
}

const mapStateToProps = state =>  ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts);