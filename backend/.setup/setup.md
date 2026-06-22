# 1. Install dependencies
npm install

# 2. Create your .env file from the example
cp .env.example .env
# Then fill in your MONGODB_URI in .env

# 3. Start dev server
npm run dev






# Health check
GET http://localhost:5000/api/v1/health

# Upload a prescription image
POST http://localhost:5000/api/v1/upload/prescription
# Body: form-data, key: "prescription", value: any .jpg/.png/.webp file







 Sprint 2 — Verification Checklist

 # 1. Install the new dependency
npm install @google/generative-ai

# 2. Add to your .env
GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=gemini-1.5-flash
GEMINI_TIMEOUT_MS=30000
GEMINI_MAX_RETRIES=3

# 3. Restart dev server
npm run dev



Test the new endpoint:
POST http://localhost:5000/api/v1/prescriptions/analyze
# Body: form-data, key: "prescription", value: a handwritten prescription image


expected response shape 
{
  "success": true,
  "message": "Prescription analyzed successfully",
  "data": {
    "rawOutput": "Doctor Information:\nDr. ... \n\nMedicines:\n1. Amoxicillin 500mg..."
  }
}




If GEMINI_API_KEY is missing from .env, the server will refuse to start — requireEnv throws immediately at config load, exactly like MONGODB_URI does in Sprint 1.

What Changed vs. Sprint 1
FileStatussrc/config/app.config.jsModified — added gemini block only, all Sprint 1 keys untouchedsrc/routes/index.jsModified — added one router.use() line.env.exampleModified — appended 4 new variablespackage.jsonModified — added one dependencyEvery other Sprint 1 fileUntouched













POST http://localhost:5000/api/v1/prescriptions/analyze
# Body: form-data, key: "prescription", value: a handwritten prescription image


Expected response:
{
  "success": true,
  "message": "Prescription analyzed successfully",
  "data": {
    "doctorName": "Dr. John Smith",
    "medicines": [
      {
        "name": "Amoxicillin",
        "dosage": "500mg",
        "frequency": "Twice daily",
        "duration": "7 days",
        "instructions": "Take after meals"
      }
    ],
    "warnings": [],
    "confidenceScore": 0.92
  }
}













mongosh "your_connection_string"
use mediread_dev
db.prescriptions.find().sort({ createdAt: -1 }).limit(1).pretty()
mongosh "your_connection_string"
use mediread_dev
db.prescriptions.find().sort({ createdAt: -1 }).limit(1).pretty()