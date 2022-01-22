import { Heading, List, Stack } from "@chakra-ui/react";
import Player from "./Player";
import { useDrop } from "react-dnd";

export const TeamBoard = ({team, setPlayer, setTeam}) =>{
  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    hover(item){
      console.log("!item!:",item)
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const removePlayerFromTeam = (item) => {
    console.log("Team-item:",item);
    setTeam((prev) => prev.filter((_, i) => item.index !== i));
    setPlayer((prev) => [...prev, item]);
  };

  return (
    <Stack width="300px">
    <Heading fontSize="3xl" color="teal.800" textAlign="center">
      TEAM
    </Heading>
    <List
      bgGradient={
        isOver
          ? "linear(to-b, teal.300, teal.500)"
          : "linear(to-b, teal.100, teal.200)"
      }
      ref={addToTeamRef}
      minH="70vh"
      boxShadow="xl"
      borderRadius="md"
      p="4"
    >
      {team.map((p, i) => (
        <Player
          item={p}
          key={i}
          index={i}
          playerType="team"
          onDropPlayer={removePlayerFromTeam}
        />
      ))}
    </List>
  </Stack>


  )
}