/**
 * Returns dispatch object keyed by `dispatch`.
 */
export function createMappedDispatch<TPayload extends object>(
	payload: TPayload
): Record<"dispatch", TPayload> {
	return Object.freeze<Record<"dispatch", TPayload>>({
		dispatch: payload,
	});
}
