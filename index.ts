import Game from './Game'

import RandomPlayer from './RandomPlayer'
import MinimaxPlayer from './MinimaxPlayer'

const host = new Game(new MinimaxPlayer(), new RandomPlayer())

host.play()
