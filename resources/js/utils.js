export function stringTruncate(str, maxLength = 200, ellipsis = true) {
    if (str.length <= maxLength || maxLength === 0) {
        return str;
    } else {
        return str.substring(0, maxLength) + (ellipsis && "...");
    }
}
