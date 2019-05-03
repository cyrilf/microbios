import Cell from '../Cell'
import createExperiment from '../utils/createExperiment'

const COLORS = [
  'rgba(255,0,0,1)', 'rgba(255,96,0,1)', 'rgba(255,191,0,1)', 'rgba(223,255,0,1)',
  'rgba(128,255,0,1)', 'rgba(32,255,0,1)', 'rgba(0,255,64,1)', 'rgba(0,255,159,1)',
  'rgba(0,255,255,1)', 'rgba(0,159,255,1)', 'rgba(0,64,255,1)', 'rgba(32,0,255,1)',
  'rgba(127,0,255,1)', 'rgba(223,0,255,1)', 'rgba(255,0,191,1)', 'rgba(255,0,96,1)',
]

export class Trippy extends Cell {
  static type = 'trippy'

  constructor(...args) {
    super(...args)
    this.state = Math.floor(Math.random() * 16)
  }

  getColor() { return COLORS[this.state] }

  process(neighbors) {
    const next = (this.state + Math.floor(Math.random() * 2)) % 16

    let changing = false
    neighbors.filter(neighbor => !!neighbor).map((neighbor) => {
      changing = changing || neighbor.state === next
      return null
    })

    if (changing) this.state = next
  }
}

export default createExperiment(Trippy)
