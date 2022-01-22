import { Container, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { PlayersBorad } from "./components/PlayersBorad"
import { TeamBoard } from "./components/TeamBoard";

function App() {
  const [players, setPlayer] = useState([
    { name: "Player 1" ,height :"10"},
    { name: "Player 2" ,height :"20"},
    { name: "Player 3" ,height :"30"},
    { name: "Player 4" ,height :"40"},
    { name: "Player 5" ,height :"50"},
  ]);
  const [team, setTeam] = useState([]);

  return (
    <Container maxW="800px">
      <Heading p="2" align="center" color="GrayText">
        React Drag & Drop
      </Heading>

      <Flex justify="space-between" height="90vh" align="center">
        <PlayersBorad players={players} setPlayer={setPlayer} setTeam={setTeam} boardname={"PlayersBorad"} />
        <TeamBoard team={team} setPlayer={setPlayer} setTeam={setTeam} />
      </Flex>
    </Container>
  );
}

export default App;
