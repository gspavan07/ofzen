import mongoose from 'mongoose';
import Certificate from '../app/models/certificateModel.js';

const MONGODB_URI = "mongodb+srv://ofzenenterprise:ofzen2602@cluster0.t5b6p.mongodb.net/ofzen?retryWrites=true&w=majority&appName=Cluster0";

async function seedCertificates() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing certificates
    await Certificate.deleteMany({});

    // Seed initial certificates
    const certificates = [
      {
        certId: '6681',
        name: 'Sample Intern 1',
        role: 'Web Development Intern',
        pdfUrl: '/cert/ofzen-web-25-6681.pdf'
      },
      {
        certId: '6781',
        name: 'Sample Intern 2',
        role: 'UI/UX Design Intern',
        pdfUrl: '/cert/ofzen-web-25-6781.pdf'
      }
    ];

    await Certificate.insertMany(certificates);
    console.log('Certificates seeded successfully');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding certificates:', error);
  }
}

seedCertificates();