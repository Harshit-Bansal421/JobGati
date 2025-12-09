/**
 * Jooble API Proxy Route
 * Handles CORS issues by proxying requests through our backend
 */

const express = require('express');
const router = express.Router();

const JOOBLE_API_KEY = 'ed6fa15d-6d03-4eea-b8bb-79a949c4c611';
const JOOBLE_BASE_URL = 'https://jooble.org/api';

/**
 * POST /api/jobs/search
 * Proxy endpoint for Jooble job search
 */
router.post('/search', async (req, res) => {
    try {
        const { keywords, location, page } = req.body;

        console.log('🔍 Proxying Jooble API request:', { keywords, location, page });

        const response = await fetch(`${JOOBLE_BASE_URL}/${JOOBLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords || '',
                location: location || 'India',
                page: page?.toString() || '1'
            })
        });

        if (!response.ok) {
            throw new Error(`Jooble API error: ${response.status}`);
        }

        const data = await response.json();
        
        console.log(`✅ Jooble returned ${data.jobs?.length || 0} jobs`);
        
        res.json(data);

    } catch (error) {
        console.error('❌ Error proxying Jooble API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch jobs from Jooble',
            message: error.message 
        });
    }
});

module.exports = router;
