/**
 * Returns store object keyed by `store`.
 */
export function createMappedStore<TPayload extends object>(
	payload: TPayload
): Record<"store", TPayload> {
	return Object.freeze<Record<"store", TPayload>>({
		store: payload,
	});
}
