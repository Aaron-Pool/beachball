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
    const annotations = {};
    if (d.scope) {
        annotations.scope = d.scope;
    }
    if (d.breaking) {
        return { type: 'major', comment: d.message, annotations };
    }
    const mappedType = (_a = types[d.type], (_a !== null && _a !== void 0 ? _a : null));
    if (mappedType) {
        const { changeType, label } = mappedType;
        annotations.customType = d.type;
        annotations.display = (label !== null && label !== void 0 ? label : d.type);
        return { type: changeType, comment: d.message, annotations };
    }
    switch (d.type) {
        case 'fix':
        case 'chore':
            return { type: 'patch', comment: d.message, annotations };
        case 'feat':
            return { type: 'minor', comment: d.message, annotations };
    }
}
//# sourceMappingURL=conventionalCommits.js.map