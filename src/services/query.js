import { firebase } from './config'
import {
	getFirestore,
	setDoc,
	doc,
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	deleteDoc,
	serverTimestamp,
	writeBatch,
	getDocs,
	getDoc,
	limit,
	orderBy,
	getCountFromServer,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDelayedEffect } from './hooks'
import axios from 'axios'

const VERSION = 2.3

const saveDocument = async (path, data = {}, onError = console.log, onSuccess = console.log) => {
	let id = path.id
	try {
		const firestore = await getFirestore(firebase)
		const timestamp = path.new ? { createdAt: serverTimestamp(), updatedAt: serverTimestamp() } : { updatedAt: serverTimestamp() }

		if (id) await setDoc(doc(firestore, path.path, path.id), { ...timestamp, ...data, __v: VERSION }, { merge: true })
		else id = await addDoc(collection(firestore, path?.path || path), { createdAt: serverTimestamp(), ...data, __v: VERSION })

		onSuccess(id)
		return id
	} catch (e) {
		onError(e.code, e.message)
	}
}

const countCollection = async (path, ...args) => {
	const firestore = await getFirestore(firebase)
	const ret = await getCountFromServer(query(collection(firestore, path), ...args))
	if (!ret) return '-'
	return ret.data()?.count
}

const listCollection1 = async (path, ...args) => {
	const firestore = await getFirestore(firebase)
	const ret1 = await getDocs(query(collection(firestore, path), ...args))

	const ret = []
	ret1.forEach(doc => ret.push({ id: doc.id, ...(doc.data && doc.data()) }))
	return ret
}

const deleteDocument = async (path, id) => {
	const firestore = await getFirestore(firebase)
	console.log('deleting', path, id)
	await deleteDoc(doc(firestore, path, id))
	console.log('done deleting', path, id)
}

const runBatch = async (documents, onError = console.log) => {
	const firestore = await getFirestore(firebase)
	const batch = writeBatch(firestore)
	documents.forEach(({ path, id, ...data }) => batch.set(doc(firestore, path, id), { ...data, __v: 0 }, { merge: true }))
	try {
		return await batch.commit()
	} catch (e) {
		onError(e)
	}
}

const useCollection = (path, ...q) => {
	const [result, setResult] = useState([])
	const [loading, setLoading] = useState(false)
	const refetch = async (...q) => {
		setLoading(true)
		const ret = await listCollection1(path, ...q)
		setResult(ret)
		setLoading(false)
		return ret
	}
	const f = async () => await refetch(...q)

	useEffect(() => {
		f()
	}, [])
	return { loading, result, refetch }
}

const useDocument = (path, id, live = false) => {
	const [result, setResult] = useState({})
	const [loading, setLoading] = useState(false)

	const refetch = async () => {
		setLoading(true)
		const firestore = await getFirestore(firebase)

		if (!live) {
			const ret = await getDoc(doc(firestore, path, id))
			if (!ret.exists()) setResult(null)
			else setResult({ id, ...ret.data() })
		} else {
			onSnapshot(doc(firestore, path, id), snapshot => setResult({ id: querySnapshot?.id, ...snapshot?.data() }))
		}
		setLoading(false)
	}

	useEffect(() => {
		if (path && id) refetch()
	}, [path, id])

	return { data: result || {}, loading, refetch }
}

// FUNCTIONS SPECIFIC TO THE APPLICATION

const useCustomers = ({ monitoringStatus, searchTerm, approvalStatus, distributionStatus, limit: lim = 16, moreFilters = {} }) => {
	const byStatus = [
		['distributionStatus', '==', distributionStatus],
		['approvalStatus', '==', approvalStatus],
		['monitoringStatus', '==', monitoringStatus],
	].filter(x => x[2] != undefined)
	const [fetching, setFetching] = useState()
	const [count, setCount] = useState(0)
	const { result, refetch, loading } = useCollection('qec-customers', ...byStatus.map(x => where(...x)), limit(1))

	const getFilters = filters =>
		[['searchTerms', 'array-contains', (searchTerm || '').toLowerCase()], ...Object.values(filters || {}), ...byStatus]
			.filter(x => !!x[2])
			.map(x => where(...x))

	const refetch1 = async () => {
		await refetch(...getFilters(moreFilters), limit(lim || 16))
		// await refetch(where('location.district', '==', 'Rwamagana'))
		setFetching(false)
	}

	useEffect(() => {
		countCollection('qec-customers', ...getFilters(moreFilters)).then(setCount)
	}, [result])

	const loadMore = () => {
		console.log('this will be load more, coming after the last result in the query')
	}

	useEffect(() => {
		setFetching(true)
	}, [...Object.values(moreFilters), searchTerm, lim])

	useEffect(() => {
		refetch1()
	}, [...Object.values(moreFilters), lim])

	useDelayedEffect(() => {
		if (searchTerm === undefined) return
		refetch1()
	}, [searchTerm])

	return { loading: loading || fetching, result, loadMore, count }
}

const allCustomers = async () => {
	const firestore = await getFirestore(firebase)
	console.log('all customers..')
	let backup = await getDoc(doc(firestore, 'qec-metadata', 'latestBackup'))
	if (backup.exists()) backup = { ...backup.data() }
	else backup = { time: new Date('2018-01-01') }
	console.log(backup)

	const data1 = backup.url ? await axios(backup.url) : { data: [] }
	const old = (data1.data || []).reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {})

	console.log(old)

	const ret = await listCollection1('qec-customers', where(...['updatedAt', '>', backup.time]), limit(10000))
	console.log(ret)
	// const new1 = ret.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {})
	const new1 = {}
	ret.forEach(element => {
		new1[element.id] = element
	})

	console.log(`${ret.length} new entries since ${new Date(backup.time?.seconds * 1000)}.`)
	console.log(`Current total entries: ${Object.keys({ ...old, ...new1 }).length}.`)

	return Object.values({ ...old, ...new1 })
}

export { allCustomers, deleteDocument, saveDocument, runBatch, useCollection, useCustomers, useDocument, where }
