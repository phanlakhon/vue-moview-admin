import { db } from './firebase'
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
  Timestamp,
} from 'firebase/firestore'

// Function to get all items from a collection
export const getItems = async (collectionName) => {
  const itemsRef = collection(db, collectionName)
  const querySnapshot = await getDocs(itemsRef)

  // Map query results into an array of items
  const items = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return items
}

// Function to get item by id from callection
export const getItemById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id) // อ้างอิงถึงเอกสาร
    const docSnap = await getDoc(docRef) // ดึงข้อมูล

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } // คืนค่าเป็น object พร้อม id
    } else {
      console.warn(`No document found in "${collectionName}" with ID: ${id}`)
      return null
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    return null
  }
}

// Function to add a new category or movie
export const addItem = async (collectionName, newData) => {
  try {
    const collectionRef = collection(db, collectionName) // Reference to the collection
    const utcDate = new Date()
    const utcTimestamp = Timestamp.fromDate(utcDate)
    const dataWithTimestamps = {
      ...newData,
      createdAt: utcTimestamp,
      updatedAt: utcTimestamp,
    }

    const docRef = await addDoc(collectionRef, dataWithTimestamps)
    console.log(`${collectionName} added successfully with ID: ${docRef.id}`)

    return docRef
  } catch (error) {
    console.error('Error adding document:', error)
  }
}

// Function to update a category or movie
export const updateItem = async (collectionName, id, updatedData) => {
  try {
    const itemRef = doc(db, collectionName, id) // Reference to the document
    const utcDate = new Date()
    const utcTimestamp = Timestamp.fromDate(utcDate)

    const dataWithUpdatedTimestamp = {
      ...updatedData,
      updatedAt: utcTimestamp, // Update only updatedAt field
    }

    await updateDoc(itemRef, dataWithUpdatedTimestamp)
    console.log(`${collectionName} with ID ${id} updated successfully`)

    return { id }
  } catch (error) {
    console.error('Error updating document:', error)
  }
}

// Function to delete a category or movie
export const deleteItem = async (collectionName, id) => {
  try {
    const itemRef = doc(db, collectionName, id) // Reference to the document

    // Perform delete
    await deleteDoc(itemRef)

    console.log(`${collectionName} with ID ${id} deleted successfully`)
  } catch (error) {
    console.error('Error deleting document:', error)
  }
}
