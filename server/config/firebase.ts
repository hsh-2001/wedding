// import { cert, getApps, initializeApp, type App, type ServiceAccount } from 'firebase-admin/app'
// import { getAuth } from 'firebase-admin/auth'
// import { getFirestore } from 'firebase-admin/firestore'

// function readFirebaseAdminConfig() {
// 	const config = useRuntimeConfig()

// 	const projectId = config.firebaseAdminProjectId
// 	const clientEmail = config.firebaseAdminClientEmail
// 	const privateKey = config.firebaseAdminPrivateKey?.replace(/\\n/g, '\n')

// 	if (!projectId || !clientEmail || !privateKey) {
// 		throw createError({
// 			statusCode: 500,
// 			statusMessage:
// 				'Missing Firebase Admin config. Set NUXT_FIREBASE_ADMIN_PROJECT_ID, NUXT_FIREBASE_ADMIN_CLIENT_EMAIL, and NUXT_FIREBASE_ADMIN_PRIVATE_KEY.',
// 		})
// 	}

// 	return { projectId, clientEmail, privateKey }
// }

// export function getFirebaseAdminApp(): App {
// 	const existing = getApps()[0]
// 	if (existing) {
// 		return existing
// 	}

// 	const { projectId, clientEmail, privateKey } = readFirebaseAdminConfig()

// 	return initializeApp({
// 		credential: cert({
// 			projectId,
// 			clientEmail,
// 			privateKey,
// 		} as ServiceAccount),
// 	})
// }

// export function getFirebaseAdminAuth() {
// 	return getAuth(getFirebaseAdminApp())
// }

// export function getFirebaseAdminDb() {
// 	return getFirestore(getFirebaseAdminApp())
// }
