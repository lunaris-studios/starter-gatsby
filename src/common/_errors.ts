const ns = "[STARTER-GATSBY]";

function createErrorMessage(message: string): string {
	return `${ns} | ${message}`;
}

export const FOO = createErrorMessage("foo");
