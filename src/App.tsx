import { Button, Flex, Heading, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import Layout from './components/Layout';

type Buttons = 0 | 1 | 2 | 3;
// const btnDir = [0, 270, 90, 180];
const btnDir = ['🡅', '🡄', '🡆', '🡇'];
const btnColors = ['#fb6962', '#1982c4', '#34a853', '#ffca3a'];

const SimonButton = ({
  number,
  currentPlay,
  isPlayerTurn,
  playerTurn,
}: {
  number: Buttons;
  currentPlay: number | null;
  isPlayerTurn: boolean;
  playerTurn: (input: number) => void;
}) => {
  return (
    <Button
      bg={btnColors[number]}
      _hover={{ opacity: 0.5 }}
      onClick={() => playerTurn(number)}
      opacity={currentPlay === number ? 1 : 0.2}
      pointerEvents={isPlayerTurn ? 'all' : 'none'}
      _focus={{ outline: 'none' }}
      _active={{ opacity: 1 }}
      // transform={`rotate(${btnDir[number]}deg)`}
      w={100}
      h={100}
      fontSize={60}
      borderRadius={50}
    >
      {/* &uarr; */}
      {btnDir[number]}
    </Button>
  );
};

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const App = () => {
  // computerTurn() fills `live` then playerTurn() empties `live` on each turn.
  const [live, setLive] = useState<number[]>([]);
  // computerTurn() uses `memory` to fill `live`.
  const [memory, setMemory] = useState<number[]>([]);
  // `delay` between each `computerTurn` play. (doesn't play when null)
  const [delay, setDelay] = useState<number | null>(null);
  // `currentPlay` controls UI buttons.
  const [currentPlay, setCurrentPlay] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(500);
  const [startAt, setStartAt] = useState(1);
  const isPlayerTurn = delay === null && memory.length !== 0;

  const newGame = () => {
    const game = [];
    for (let i = 0; i < startAt; i++) {
      game.push(Math.floor(Math.random() * 4));
    }
    setMemory(game);
    setDelay(speed ?? Math.floor(Math.random() * 400) + 100);
  };

  const newPlay = () => {
    const game = [...memory, Math.floor(Math.random() * 4)];
    setMemory(game);
    setDelay(speed ?? Math.floor(Math.random() * 400) + 100);
  };

  const play = (input: number) => {
    setCurrentPlay(input);
    setTimeout(
      () => {
        setCurrentPlay(null);
      },
      speed ? speed - 100 : 400,
    );
  };

  const computerTurn = () => {
    const current = memory[live.length] ?? null;

    if (current === null) {
      setDelay(null);
      return;
    }

    play(current);
    setDelay(speed ?? Math.floor(Math.random() * 400) + 100);
    setLive([...live, current]);
  };

  useInterval(computerTurn, delay);

  const playerTurn = (input: number) => {
    const [current, ...nextTurns] = live;

    if (current !== input) {
      setLive([]);
      setMemory([]);
      return;
    }

    setLive([...nextTurns]);
    setCurrentPlay(null);
    play(input);

    if (nextTurns.length === 0) {
      setTimeout(
        () => {
          newPlay();
        },
        speed ? speed - 100 : 400,
      );
    }
  };

  const handleKey = (key: string) => {
    console.log('🚀 ~ handleKey ~ key', key);
    switch (key) {
      case 'ArrowUp':
        return playerTurn(0);
      case 'ArrowLeft':
        return playerTurn(1);
      case 'ArrowRight':
        return playerTurn(2);
      case 'ArrowDown':
        return playerTurn(3);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log('🚀 ~ onKeyDown ~ isPlayerTurn', isPlayerTurn);
      if (isPlayerTurn) {
        handleKey(e.key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // `playerTurn()` event depends on `live`
  }, [live, isPlayerTurn]);

  return (
    <Layout>
      <Heading pt={10} pb={8} size="lg">
        Simon
      </Heading>
      {memory.length === 0 ? (
        <HStack>
          <Input type="number" w="70px" value={startAt} onChange={(e) => setStartAt(Number(e.currentTarget.value))} />
          <Button onClick={newGame}>Start</Button>
        </HStack>
      ) : (
        <Button
          w={120}
          onClick={() => {
            setMemory([]);
            setLive([]);
            setDelay(null);
          }}
          sx={{
            ':hover': {
              bg: '#e8635d',
            },
            ':hover:before': {
              content: `"Quit"`,
            },
            ':hover p': {
              display: 'none',
            },
          }}
        >
          <Text>{isPlayerTurn ? 'Your turn' : memory.length}</Text>
        </Button>
      )}

      <Stack pt={10} align="center" w="100%">
        <SimonButton number={0} currentPlay={currentPlay} isPlayerTurn={isPlayerTurn} playerTurn={playerTurn} />
        <Flex justify="space-around" w="100%">
          <SimonButton number={1} currentPlay={currentPlay} isPlayerTurn={isPlayerTurn} playerTurn={playerTurn} />
          <SimonButton number={2} currentPlay={currentPlay} isPlayerTurn={isPlayerTurn} playerTurn={playerTurn} />
        </Flex>
        <SimonButton number={3} currentPlay={currentPlay} isPlayerTurn={isPlayerTurn} playerTurn={playerTurn} />
      </Stack>
      <HStack mt={10}>
        <Text>Speed:</Text>
        <Button isActive={speed === 500} onClick={() => setSpeed(500)}>
          Normal
        </Button>
        <Button isActive={speed === 400} onClick={() => setSpeed(400)}>
          Faster
        </Button>
        <Button isActive={speed === 200} onClick={() => setSpeed(200)}>
          Fun
        </Button>
        <Button isActive={speed === null} onClick={() => setSpeed(null)}>
          Random
        </Button>
      </HStack>
    </Layout>
  );
};

export default App;
