"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 1. type
 * 2. scope
 * 3. breaking
 * 4. message
 */
const COMMIT_RE = /([a-z]+)(?:\(([a-z]+)\))?(!)?: (.+)/;
function parseConventionalCommit(commitMessage, { types = {} }) {
    const match = commitMessage.match(COMMIT_RE);
    const data = match
        ? { type: match[1], scope: match[2], breaking: !!match[3], message: match[4] }
        : undefined;
    return data && map(data, types);
}
exports.parseConventionalCommit = parseConventionalCommit;
function map(d, types) {
    var _a;
    if (d.breaking) {
        return { type: 'major', message: d.message };
    }
    const customType = (_a = types[d.type], (_a !== null && _a !== void 0 ? _a : null));
    if (customType) {
        return { type: customType, message: d.message };
    }
    switch (d.type) {
        case 'fix':
        case 'chore':
            return { type: 'patch', message: d.message };
        case 'feat':
            return { type: 'minor', message: d.message };
    }
}
//# sourceMappingURL=conventionalCommits.js.map