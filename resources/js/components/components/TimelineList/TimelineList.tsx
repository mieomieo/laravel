import styles from "./TimelineList.module.css";
import { storage } from "../../fake.ts";
import { useEffect,useState, MouseEventHandler, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import NodeItem,{NodeItemPayload} from "../NodeItem/NodeItem.tsx";

type EventItem = {
  title: string;
  content: string;
  offsetY: number;
  isCollapse: boolean;
};

function TimelineList() {
  const listTmp: EventItem[] = [];
  const [listEventItem, setListEventItem] = useState(listTmp);
  const [lists, setLists] = useState(storage);
  const [heightOfTimeLine, setHeightOfTimeLine] = useState(1000);
  const [isClicked, setIsClicked] = useState(false);

  //useRef
  const timeLineRef = useRef<HTMLDivElement>(null);

  const handleDelete = (id: string) => {
    const newArr = lists.filter((item) => item.id !== id);
    setLists(newArr);
  };

  const handleChooseTimeline: MouseEventHandler<HTMLDivElement> = (e) => {
    const topOfTimeLine: number | null =
      timeLineRef.current.getBoundingClientRect().top;
    const y = e.clientY - topOfTimeLine;
    // console.log("clientY:", e.clientY);
    // console.log("Y:", y);

    const offSetHeightOfTarget = e.currentTarget.offsetHeight;
    const logPercent = Math.floor((y / offSetHeightOfTarget) * 100);
    // console.log("value: ", `${logPercent} %`);
    const day = Math.floor((1095 * logPercent) / 100);

    setLists((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: "..aaaa.",
        content: "ababbb",
        createAt: day,
        offsetY: y,
      },
    ]
    );
    // console.log("Array:", lists);
  };
  useEffect(() => {
    console.log("Array:", lists);
  }, [lists]);
  const handleEdit = (id:string,payload:NodeItemPayload)=>{
    const index = lists.findIndex((item)=> item.id === id  );
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
                handleEdit = {handleEdit}
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
