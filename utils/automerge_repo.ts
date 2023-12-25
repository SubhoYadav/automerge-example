import { isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import {next as A} from "@automerge/automerge"

console.log("Initialising an automerge")

// To create/find we need to create an automerge repository
const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter()],
  storage: new IndexedDBStorageAdapter(),
})

// Opening/creating a new document inside the repo
const rootDocUrl = `${document.location.hash.substring(1)}`
let handle
if (isValidAutomergeUrl(rootDocUrl)) {
    handle = repo.find(rootDocUrl)
} 
else {
    handle = repo.create<{counter?: A.Counter}>()
    handle.change(d => d.counter = new A.Counter())
}
const docUrl = document.location.hash = handle.url
// @ts-ignore
window.handle = handle 