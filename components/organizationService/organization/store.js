const Model = require ('./model');
const { ObjectId } = require('mongodb');


async function createOrganization(organization){
    try {
    const newOrganization = new Model(organization);
    return newOrganization.save();;
    } catch (error) {
      console.error('Error occurred during creating organization:', error);
      return false;
    }
    
};

async function getNamesandCoordenates() {
  try {
    const organizations = await Model.find({}, "organizationName latitude longitude");
    return organizations;
  } catch (error) {
    throw new Error("An error occurred while fetching organization names and coordinates: " + error);
  }
}

async function getOrganization(organizationId) {
  try {
    const objectId = new ObjectId(organizationId)
    const organization = await Model.findById(objectId).exec();
    return organization;
  } catch (error) {
    console.error("Error occurred during searching organization:", error);
    throw error;
  }
}

async function getAllOrganization(){
    const organization = await Model.find();
    return organization;
}

function deleteOrganization(id){
    return Model.deleteOne({
        _id: id
    });
}
async function checkOrganizationExists(id) {
  try {
    const OrganizationFound = await Model.findOne({ email: id });
  if(OrganizationFound)
  {
    return true;
  }
 return false;
  } catch (error) {
    console.error('Error occurred during searching organization:', error);
  }
  
}
module.exports = {
    getAll: getAllOrganization,
    add: createOrganization,
    getOne: getOrganization,
    delete: deleteOrganization,
    exists: checkOrganizationExists,
    getAllCoordenates: getNamesandCoordenates,
}