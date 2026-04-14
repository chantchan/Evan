// routes/applications.js

const express = require('express');
const router = express.Router();

// Job Application Model (Assuming a model exists)
const JobApplication = require('../models/JobApplication');

// Create a new job application
router.post('/', async (req, res) => {
    try {
        const newApplication = new JobApplication(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all job applications
router.get('/', async (req, res) => {
    try {
        const applications = await JobApplication.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a job application by ID
router.get('/:id', async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (application) {
            res.status(200).json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a job application
router.put('/:id', async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (application) {
            res.status(200).json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a job application
router.delete('/:id', async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndDelete(req.params.id);
        if (application) {
            res.status(200).json({ message: 'Application deleted successfully' });
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;