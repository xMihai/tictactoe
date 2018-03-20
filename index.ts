import Host from './Host'

import RandomPlayer from './RandomPlayer'

const host = new Host([new RandomPlayer(), new RandomPlayer()])

host.play()
