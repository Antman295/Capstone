import Produce from '../models/produceSchema.mjs';
import produce from '../data/data.mjs';

async function createProduce(req, res) {
  try {
    // Create a new produce obj
    let newProduce = new Produce(req.body);

    // Save new obj to DB
    await newProduce.save();

    // Return Result
    res.json(newProduce);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function getAllProduce(req, res) {
  try {
    // Find ALL {} produce from DB
    let allProduce = await Produce.find({});

    // Return Result
    res.json(allProduce);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function getOneProduce(req, res) {
  try {
    let oneProduce = await Produce.findById(req.params.id);

    res.json(oneProduce);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function updateOneProduce(req, res) {
  try {
    let updatedProduce = await Produce.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Return results
    res.json(updatedProduce);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function deleteOneProduce(req, res) {
  try {
    await Produce.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Item Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

async function seedDB(req, res) {
  try {
    await Produce.deleteMany({}); //Delete everything
    await Produce.create(produce); //Reseed with new data

    res.json({ msg: 'DB Seeded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

export default {
  createProduce,
  getAllProduce,
  updateOneProduce,
  deleteOneProduce,
  getOneProduce,
  seedDB,
};