import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
    res.send("hi");
});

export default router;