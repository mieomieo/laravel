import styles from "./TimelineList.module.css";
import { storage } from "../../fake";
import React, { useEffect, useState, MouseEventHandler, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import NodeItem, { NodeItemPayload } from "../NodeItem/NodeItem";
import { connect } from "react-redux";
import { addPost, deletePost, getPosts } from "../../action/post";
import PropTypes from "prop-types";

function TimelineList(props) {
 
        console.log("render");
    const { addPost } = props;
    const { posts } = props.post;
    const [heightOfTimeLine, setHeightOfTimeLine] = useState(1000);
    //useRef
    const timeLineRef = useRef<HTMLDivElement>(null);

    const handleChooseTimeline: MouseEventHandler<HTMLDivElement> = async (
        e
    ) => {
        e.preventDefault();

        let topOfTimeLine: number | null = null; // Khai báo biến ở ngoài khối if
        if (timeLineRef.current) {
            topOfTimeLine = timeLineRef.current.getBoundingClientRect().top;
        }
        const y = e.clientY - (topOfTimeLine !== null ? topOfTimeLine : 0);
        const offSetHeightOfTarget = e.currentTarget.offsetHeight;
        const logPercent = Math.floor((y / offSetHeightOfTarget) * 100);
        const day = Math.floor((1095 * logPercent) / 100);
        await addPost({ title: "", content: "", date: day, offsetY: y });
        console.log("await");
    };
    return (
        <>
            <div className={styles.main}>
                <h3 className={styles.heading}>Timeline</h3>
                <div className={styles.container}>
                    <ul>
                        {posts.map((item) => (
                            <NodeItem
                                key={item.id}
                            
                                data={{
                                    id: item.id,
                                    title: item.title,
                                    content: item.content,
                                    offsetY: item.offsetY,
                                    date: item.date
                                }}
                            />
                        ))}
                    </ul>
                    <div
                        style={{ height: `${heightOfTimeLine}px` }}
                        ref={timeLineRef}
                        onClick={handleChooseTimeline}
                        className={styles.timeline}
                    >
                        <div className={styles.circleBottom}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
TimelineList.propTypes = {
    addPost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    post: state.post,
});
export default connect(mapStateToProps, { addPost})(TimelineList);
