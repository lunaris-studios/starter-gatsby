import * as React from "react";

/**
 * Returns true if `node` is null/undefined, false, empty string, or an array
 * composed of those. If `node` is an array, only one level of the array is
 * checked, for performance reasons.
 */
export function isReactNodeEmpty(node?: React.ReactNode, skipArray = false): boolean {
    return (
        node == null ||
        node === "" ||
        node === false ||
        (!skipArray &&
            Array.isArray(node) &&
            // only recurse one level through arrays, for performance
            (node.length === 0 || node.every(n => isReactNodeEmpty(n, true))))
    );
}

/**
 * Converts a React node to an element: non-empty string or number or
 * `React.Fragment` (React 16.3+) is wrapped in given tag name; empty strings
 * and booleans are discarded.
 */
export function ensureElement(child: React.ReactNode | undefined, tagName: keyof JSX.IntrinsicElements = "span") {
    if (child == null || typeof child === "boolean") {
        return undefined;
    } else if (typeof child === "string") {
        // cull whitespace strings
        return child.trim().length > 0 ? React.createElement(tagName, {}, child) : undefined;
    } else if (typeof child === "number" || typeof (child as any).type === "symbol" || Array.isArray(child)) {
        // React.Fragment has a symbol type, ReactNodeArray extends from Array
        return React.createElement(tagName, {}, child);
    } else if (isReactElement(child)) {
        return child;
    } else {
        // child is inferred as {}
        return undefined;
    }
}

export function isReactElement<T = any>(child: React.ReactNode): child is React.ReactElement<T> {
    return (
        typeof child === "object" &&
        typeof (child as any).type !== "undefined" &&
        typeof (child as any).props !== "undefined"
    );
}

/**
 * Represents anything that has a `name` property such as Functions.
 */
export interface INamed {
    name?: string;
}

export function getDisplayName(ComponentClass: React.ComponentType | INamed) {
    return (ComponentClass as React.ComponentType).displayName || (ComponentClass as INamed).name || "Unknown";
}

/**
 * Returns true if the given JSX element matches the given component type.
 *
 * NOTE: This function only checks equality of `displayName` for performance and
 * to tolerate multiple minor versions of a component being included in one
 * application bundle.
 * @param element JSX element in question
 * @param ComponentType desired component type of element
 */
export function isElementOfType<P = {}>(
    element: any,
    ComponentType: React.ComponentType<P>,
): element is React.ReactElement<P> {
    return (
        element != null &&
        element.type != null &&
        element.type.displayName != null &&
        element.type.displayName === ComponentType.displayName
    );
}
