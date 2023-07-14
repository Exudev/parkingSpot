const Model = require ('./model');
const { ObjectId } = require('mongodb');

async function addOrganization(organization){
    try {
    const newOrganization = new Model(organization);
    return newOrganization.save();;
    } catch (error) {
      console.error('Error occurred during creating organization:', error);
      return false;
    }
    
};

async function getNamesandCoordenates(){

}

async function getOrganization(organizationId){
try {
  const OrganizationFound = await Model.find({ _id: new ObjectId(organizationId) }).exec();
  return OrganizationFound;
} catch (error) {
  console.error('Error occurred during searching organization:', error);
}
}
async function checkOrganizationExists(email) {
  try {
    const OrganizationFound = await Model.findOne({ email: email });
  if(OrganizationFound)
  {
    return true;
  }
 return false;
  } catch (error) {
    console.error('Error occurred during searching organization:', error);
  }
  
}
  
async function seeAllOrganization(){
    const organization = await Model.find();
    return organization;
}

function deleteOrganization(id){
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    list: seeAllOrganization,
    add: addOrganization,
    get: getOrganization,
    delete: deleteOrganization,
    exists: checkOrganizationExists,
    namesAndCoordenates: getNamesandCoordenates,
}