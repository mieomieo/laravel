import styles from "./TimelineList.module.css";
import React, { useState, MouseEventHandler, useRef } from "react";
import NodeItem from "../NodeItem/NodeItem";
import { addPost } from "../../reducers/timelineSlice";
import { useSelector, useDispatch } from "react-redux";

function TimelineList() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);

    console.log("posts:", posts);
    const [heightOfTimeLine, setHeightOfTimeLine] = useState(1000);
    //useRef
    const timeLineRef = useRef<HTMLDivElement>(null);

    const handleChooseTimeline: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        console.log("click add");

        let topOfTimeLine: number | null = null; // Khai báo biến ở ngoài khối if
        if (timeLineRef.current) {
            topOfTimeLine = timeLineRef.current.getBoundingClientRect().top;
        }
        const y = e.clientY - (topOfTimeLine !== null ? topOfTimeLine : 0);
        const offSetHeightOfTarget = e.currentTarget.offsetHeight;
        const logPercent = Math.floor((y / offSetHeightOfTarget) * 100);
        const day = Math.floor((1095 * logPercent) / 100);
        dispatch(addPost({ title: "", content: "", date: day, offsetY: y }));
        // console.log("await");
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
                                    date: item.date,
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

export default TimelineList;
