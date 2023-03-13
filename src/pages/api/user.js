import { requireAuth } from '@/lib/auth'

import USER from '@/data/user'

export default requireAuth((req, res) => {
    const { password, ...body } = USER
    res.status(200).json(body)
})
