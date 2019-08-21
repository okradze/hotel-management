const { parseResolveInfo } = require('graphql-parse-resolve-info')

function parseInfo(info, additionalFields = '') {
    const parsedInfo = parseResolveInfo(info).fieldsByTypeName.Hotel

    const resolveInfo = `{ ${additionalFields} ${Object.keys(parsedInfo).join(
        ' ',
    )} }`

    return resolveInfo
}

export default parseInfo
