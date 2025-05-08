import Dexie, { type EntityTable } from "dexie"

export interface LikeData {
    id: string
    dateAdded: Date
}

export const db = new Dexie("Likes") as Dexie & {
    likes: EntityTable<LikeData, "id">
} 

db.version(1).stores({
    likes: "id,dateAdded",
})

export async function listaLikes() {
    return (await db.likes.orderBy("dateAdded").toArray()).reverse()
}

export async function agregarLike(id: string) {
    return await db.likes.add({
        id, dateAdded: new Date()
    })
}

export async function tieneLike(id: string) {
    return (await db.likes.get(id)) !== undefined
}

export async function borrarLike(id: string) {
    await db.likes.delete(id)
}
