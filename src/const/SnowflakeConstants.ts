export const categoryOfApplication = {
  STANDARD : 'Standard',
  ENTERPRISE : 'Enterprise',
  BUSINESS_CRITICAL : 'Business Critical'
}

export const storageTypes = {
  ON_DEMAND : 'On Demand',
  PRE_PURCHASE : 'Pre Purchase'
}

export const cloudPlatforms = {
  AWS : 'Amazon Web Services (AWS)',
  AZURE : 'Microsoft Azure',
  GCP : 'Google Cloud Platform'
}

export const geographyOfApplication = [
  'US',
  'Canada',
  'Ireland',
  'Frankfurt',
  'Sydney',
  'Singapore',
  'Tokyo',
  'Mumbai'
]

export const wareHouseTableHeaders = [
  'Category',
  'Cloud Platform',
  'Geography',
  'Size',
  'No of days per week',
  'No of sessions per day', 
  'Duration of session (mins)',
  'Estimated Storage (TB)',
  'Type of storage',
  'Action'		
]

export const storageCosts = [
  {geo:'US', rate:23},  
  {geo:'Canada',rate:25},
  {geo:'Ireland',rate: 23}, 
  {geo:'Frankfurt',rate:24.5}, 
  {geo:'Sydney', rate: 25},
  {geo:'Singapore', rate:25},
  {geo:'Tokyo', rate:25},
  {geo:'Mumbai', rate:25
}]

export const categories = [
  {geo:'US', std:2, ent:3, biz:4},
  {geo:'Canada', std:2.25, ent:3.5, biz:4.5}, 
  {geo:'Ireland', std:2.5, ent:3.7, biz:4.5},
  {geo:'Frankfurt', std:2.7, ent:4, biz:5.4},
  {geo:'Sydney', std:2.75, ent:4.05 ,biz:5.5},  
  {geo:'Singapore', std:2.5, ent:3.7, biz:5.7}, 
  {geo:'Tokyo', std:2.85, ent:4.3 ,biz:5.7},
  {geo:'Mumbai', std:2.2, ent:3.3, biz:4.4
}]

export const storageSize = [
  {size:'XS', credits:1},
  {size:'S', credits:2},
  {size:'M', credits:4},
  {size:'L', credits:8},
  {size:'XL', credits:16},
  {size:'2XL', credits:32},
  {size:'2XL', credits:64},
  {size:'4XL', credits:128},
]
