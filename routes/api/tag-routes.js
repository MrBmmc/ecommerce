const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll(req.params.id, {
      // be sure to include its associated Product data 
      include: [{ model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (error) {
    // send error response
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product }]

    });

    if (!tagData) {
      res.status(404).json({ message: 'No Product found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  }
  catch (error) {
    // send error response
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    newTag = await Tag.create({ tag_name: req.body.tag_name });

    res.status(200).json(newTag);
  }
  catch (error) {
    // send error response
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body,
      { where: { id: req.params.id } });
    res.status(200).json(updateTag);
  }

  catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTag = await Tag.destroy(
      { where: { id: req.params.id } });
    res.status(200).json(tagData);

  }
  catch (error) {
    res.status(400).json(error);
  }

});

module.exports = router;
