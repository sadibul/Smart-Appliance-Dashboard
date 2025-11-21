// Paste this to replace lines 117-128 in server.js:

// Get summary statistics
app.get('/api/energy/stats', async (req, res) => {
  try {
    const period = req.query.period || 'today'; // today, week, month
    const stats = await getSummaryStats(period);
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
