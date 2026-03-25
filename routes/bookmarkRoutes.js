import express from 'express'
import Bookmark from '../models/Bookmark.js'
import { authMiddleware } from '../utils/auth.js'

const router = express.Router()
 
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
// GET /api/bookmarks - Get all bookmarks for the logged-in user
router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({user: req.user._id});
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/bookmarks/:id - Get a bookmark for the logged-in user
router.get('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'No bookmark found with this id!' });
    }
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to view this bookmark' });
    }
    res.json(bookmark);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// POST /api/bookmarks - Create a new bookmark
router.post('/', async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/bookmarks/:id - Update a bookmark
router.put('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'No bookmark found with this id!' });
    }
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this bookmark' });
    }
    const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updatedBookmark);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// DELETE /api/bookmarks/:id - Delete a bookmark
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'No bookmark found with this id!' });
    }
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this bookmark' });
    }
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bookmark deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
export default router