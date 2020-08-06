import * as Props from "./_props";

function createErrorMessage(message: string): string {
	return `${Props.DISPLAYNAME_PREFIX} | ${message}`;
}

export const FOO_WARN_NO_BAR = createErrorMessage("no bar present in foo");
