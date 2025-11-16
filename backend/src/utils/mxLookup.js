import dns from 'dns'

async function hasValidMxRecord(email) {
    const domain = email.split("@")[1]
    try {
        const records = await dns.promises.resolveMx(domain)
        return records && records.length> 0
    } catch (error) {
        return false
    }
}

export default hasValidMxRecord