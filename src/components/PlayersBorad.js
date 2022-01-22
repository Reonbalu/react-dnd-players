import { Heading, List, Stack } from "@chakra-ui/react";
import Player from "./Player";
import { useDrop } from "react-dnd";

export const PlayersBorad = ({players, setPlayer, setTeam, boardname}) =>{

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    drop(item){
      console.log("dropped!!:", item.name , "/" , item.height ,"/preindex:" , item.index, "/nextIndex:", boardname)
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const movePlayerToTeam = (item) => {
    console.log("PLAYERS-item:",item);
    setPlayer((prev) => prev.filter((_, i) => item.index !== i));
    setTeam((prev) => [...prev, item]);
  };

  return (
    <Stack width="300px">
      <Heading fontSize="3xl" color="yellow.800" textAlign="center">
        PLAYERS<br/>
        {isPlayerOver ? "Overされてるぜ！" : "Nothing"}
      </Heading>
      <List
        bgGradient={
          isPlayerOver
            ? "linear(to-b, yellow.300, yellow.500)"
            : "linear(to-b, yellow.100, yellow.200)"
        }
        ref={removeFromTeamRef}
        p="4"
        minH="70vh"
        boxShadow="xl"
        borderRadius="md"
      >
        {players.map((p, i) => (
          <Player
            item={p}
            key={i}
            playerType="player"
            onDropPlayer={movePlayerToTeam}
            index={i}
          />
        ))}
      </List>
    </Stack>
  );
};
