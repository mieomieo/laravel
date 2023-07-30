import styles from "./TimelineList.module.css";
import { storage } from "../../fake";
import React, { useEffect, useState, MouseEventHandler, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import NodeItem, { NodeItemPayload } from "../NodeItem/NodeItem";
import { connect } from "react-redux";

function TimelineList({ post: { posts } }) {
    const [lists, setLists] = useState(posts);
    useEffect(() => {
        setLists(posts);
    }, [posts]);
    // console.log("lists:", lists);

    const [heightOfTimeLine, setHeightOfTimeLine] = useState(1000);

    //useRef
    const timeLineRef = useRef<HTMLDivElement>(null);

    const handleDelete = (id: string) => {
        const newArr = lists.filter((item) => item.id !== id);
        setLists(newArr);
    };

    const handleChooseTimeline: MouseEventHandler<HTMLDivElement> = (e) => {
        let topOfTimeLine: number | null = null; // Khai báo biến ở ngoài khối if
        if (timeLineRef.current) {
            topOfTimeLine = timeLineRef.current.getBoundingClientRect().top;
        }
        const y = e.clientY - (topOfTimeLine !== null ? topOfTimeLine : 0);
        const offSetHeightOfTarget = e.currentTarget.offsetHeight;
        const logPercent = Math.floor((y / offSetHeightOfTarget) * 100);
        const day = Math.floor((1095 * logPercent) / 100);
        setLists((prev) => [
            ...prev,
            {
                // id: uuidv4(),
                title: "",
                content: "",
                createAt: day,
                offsetY: y,
            },
        ]);
        // console.log("Array:", lists);
    };
    // useEffect(() => {
    //     console.log("Array:", lists);
    // }, [lists]);
    const handleEdit = (id: string, payload: NodeItemPayload) => {
        const index = lists.findIndex((item) => item.id === id);
        const newArr = [...lists];
        newArr[index].title = payload.editedTitle;
        newArr[index].content = payload.editedContent;
        if (payload.editedDate !== undefined) {
            newArr[index].createAt = payload.editedDate;
        }
        setLists(newArr);
    };
    return (
        <>
            <div className={styles.main}>
                <h3 className={styles.heading}>Timeline</h3>
                <div className={styles.container}>
                    <ul>
                        {lists.map((item) => (
                            <NodeItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                content={item.content}
                                createAt={item.createAt}
                                handleDelete={handleDelete}
                                offsetY={item.offsetY}
                                handleEdit={handleEdit}
                                // post={post}
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

const mapStateToProps = (state) => ({
    post: state.post,
});
export default connect(mapStateToProps)(TimelineList);
