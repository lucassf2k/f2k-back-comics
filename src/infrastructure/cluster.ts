import OS from 'node:os'
import cluster from 'node:cluster'
import { expressApplication } from '@/infrastructure/express'

const CPUsAvailableCount = OS.availableParallelism()

function runPrimaryProcess(): void {
  console.log(`Numbers of CPUs is ${CPUsAvailableCount}`)
  console.log(`Primary ${process.pid} is running`)
  for (let index = 0; index < CPUsAvailableCount; index++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`)
    console.log(`Let's fork another worker`)
    cluster.fork()
  })
}

function runWorkerProcess(): void {
  console.log(`Worker ${process.pid} started`)
  expressApplication()
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
