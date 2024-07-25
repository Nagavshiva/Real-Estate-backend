const Property = require('../models/propertyModel');

exports.createProperty = async (req, res) => {
    try {
        const property = new Property({ ...req.body, agentId: req.user.id });
        await property.save();
        res.status(201).json({ message: 'Property created successfully', property });
    } catch (err) {
        res.status(500).json({ message: 'Error creating property', error: err });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const { location, minPrice, maxPrice, type } = req.query;

      
        const query = {};
        if (location) query.location = { $regex: location, $options: 'i' }; // Case-insensitive search
        if (minPrice) query.price = { ...query.price, $gte: parseFloat(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };
        if (type) query.type = type;
        const properties = await Property.find(query);
        res.json({ message: 'Properties fetched successfully', properties });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching properties', error: err });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property updated successfully', property });
    } catch (err) {
        res.status(500).json({ message: 'Error updating property', error: err });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(204).json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting property', error: err });
    }
};
