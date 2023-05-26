const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'parkingSpotDB';
const userCollectionName = 'User';
const vehicleCollectionName = 'Vehicle';
const driverInfoCollectionName = 'UserDriverInfo';
const colorCollectionName = 'Color';
const employeeCollectionName = 'Employee';
const occupationCollectionName = 'Occupation';
const modelCollectionName = 'Model';
const brandCollectionName = 'Brand';
const userOwnerInfoCollectionName = 'UserOwnerInfo'; 
const parkringLotCollectionName = 'ParkingLot';
const parkringCollectionName = 'Parking';

// Sample data for collections
const usersData = [
  { Id: 1, email: 'pablo.euardo10@gmail.com', password: 'password123', userType: 'admin' },
  { Id: 2,email: 'jane@example.com', password: 'password456', userType: 'user' },
  { Id: 3,email: 'bob@example.com', password: 'password789', userType: 'user' }
];
const usersOwnerInfoData = [
    { Id: 1, companyName: 'Novosit', RNC: 42069},
    { Id: 2, companyName: 'INTEC', RNC: 506090},
    { Id: 3,companyName: 'Agora', RNC: 777666999}
  ];
const brandData = [
    {Id: 1, Brand: 'Toyota'},
    {Id: 2, Brand: 'Honda'},
    {Id: 3, Brand: 'Ford'}
];
const modelData = [
    {Id: 1,IdBrand: 1, Model: 'Corolla'},
    {Id: 2,IdBrand: 2, Model: 'Civic'},
    {Id: 3,IdBrand: 3, Model: 'Mustang'}
];
const colorData = [
    {Id: 1, Color: 'Red'},
    {Id: 2, Color: 'Blue'},
    {Id: 3, Color: 'Yellow'}
];
const vehiclesData = [
  {Id:1, IdBrand: 1, IdModel: 1, IdColor: 1, Year: 2020, Plate: 'ABC123', description: 'Compact car', owner: 'john@example.com' },
  {Id:2, IdBrand: 2, IdModel: 2, IdColor:2, Year: 2019, Plate: 'DEF456', description: 'Sedan', owner: 'jane@example.com' },
  {Id:3, IdBrand: 3, IdModel: 3, IdColor: 3, Year: 2022, Plate: 'GHI789', description: 'Sports car', owner: 'bob@example.com' }
];

const driverInfoData = [
  { firstName: 'John', lastName: 'Doe', birthDate: '1990-05-15' },
  { firstName: 'Jane', lastName: 'Smith', birthDate: '1995-09-20' },
  { firstName: 'Bob', lastName: 'Johnson', birthDate: '1985-12-10' }
];
const employeeData = [
    { Id: 1, positionId: 1, firstName: 'John', lastName: 'Doe'},
    {Id: 2, positionId: 2, firstName: 'Jane', lastName: 'Smith' },
    {Id: 3, positionId: 1, firstName: 'Bob', lastName: 'Johnson'}
];
const occupationData = [
    { Id: 1, Occupation: 'Security Guard' },
    { Id: 2, Occupation: 'Moderator' },
];
const ParkingData = [
{Id: 1, parkingLot: 1, BasePrice: 15.5},
{Id: 2, parkingLot: 1, BasePrice: 15.5}
];
const ParkingLotData = [
    {Id: 1, name:'Parqueo profesores', level: 1, zone: '', totalParking: 50, inUsedParking: 25},
    {Id: 2, name:'Parqueo subterraneo', level: 3, zone: '', totalParking: 120, inUsedParking: 25}
]
async function createDatabaseAndCollections() {
  try {
    // Create a new MongoDB client
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the MongoDB server
    await client.connect();

    // Get a reference to the database
    const db = client.db(dbName);

    // Create collections and insert documents
    await db.collection(userCollectionName).insertMany(usersData);
    await db.collection(vehicleCollectionName).insertMany(vehiclesData);
    await db.collection(driverInfoCollectionName).insertMany(driverInfoData);
    await db.collection(brandCollectionName).insertMany(brandData);
    await db.collection(colorCollectionName).insertMany(colorData);
    await db.collection(parkringCollectionName).insertMany(ParkingData);
    await db.collection(employeeCollectionName).insertMany(employeeData);
    await db.collection(occupationCollectionName).insertMany(occupationData);
    await db.collection(modelCollectionName).insertMany(modelData);
    await db.collection(userOwnerInfoCollectionName).insertMany(usersOwnerInfoData);
    await db.collection(parkringLotCollectionName).insertMany(ParkingLotData);
    console.log('Database and collections created successfully.');

    // Close the client connection
    client.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the function to create the database and collections
createDatabaseAndCollections();
