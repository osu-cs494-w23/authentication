import USER from '@/data/user'

export default (req, res) => {
    const { password, ...body } = USER
    res.status(200).json(body)
}
