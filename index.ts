import Host from './Host'

import RandomPlayer from './RandomPlayer'
import MinimaxPlayer from './MinimaxPlayer'

const host = new Host(new MinimaxPlayer(), new MinimaxPlayer())

host.play()
