import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: 'OFZEN'
  },
  pdfUrl: {
    type: String,
    default: ''
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  valid: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);