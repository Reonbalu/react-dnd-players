import React, { useState, useCallback, useRef, FC } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DND_GROUP = "list";

interface DragItem {
  type: string;
  index: number;
}

interface ListProps {
  index: number;
  text: string;
  swapList: (sourceIndex: number, targetIndex: number) => void;
}

const List: FC<ListProps> = ({ index, text, swapList }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: DND_GROUP,
    drop(item: DragItem) {
      if (!ref.current || item.index === index) {
        return;
      }
      swapList(item.index, index);
    }
  });

  const [, drag] = useDrag({
    type: DND_GROUP,
    item: { type: DND_GROUP, index }
  });
  drag(drop(ref));
  return <li ref={ref}>{text}</li>;
};

const ListView = () => {
  const [list, setList] = useState(["foo", "bar", "baz", "hoge", "huga"]);
  const swapList = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      [list[targetIndex], list[sourceIndex]] = [
        list[sourceIndex],
        list[targetIndex]
      ];
      setList(list.splice(0));
    },
    [list]
  );
  return (
    <ul>
      {list.map((text, index) => (
        <List key={index} text={text} index={index} swapList={swapList} />
      ))}
    </ul>
  );
};

export const App: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ListView />
    </DndProvider>
  );
};
