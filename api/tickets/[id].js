const clientPromise = require('../../lib/mongo');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || 'ticketingDB');
  const Tickets = db.collection('tickets');

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body || {};
      if (!['Open', 'Completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      const set = { status };
      if (status === 'Completed') set.completedAt = new Date().toISOString();
      if (status === 'Open') set.completedAt = null;

      const r = await Tickets.updateOne({ _id: new ObjectId(id) }, { $set: set });
      if (r.matchedCount === 0) return res.status(404).json({ error: 'Ticket not found' });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const r = await Tickets.deleteOne({ _id: new ObjectId(id) });
      if (r.deletedCount === 0) return res.status(404).json({ error: 'Ticket not found' });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.setHeader('Allow', 'PATCH, DELETE');
  return res.status(405).json({ error: 'Method Not Allowed' });
};
