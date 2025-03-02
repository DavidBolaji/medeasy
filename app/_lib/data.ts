export const medicalList = [
  {
    key: 'Yes',
    label: 'Yes',
  },
  {
    key: 'No',
    label: 'No',
  },
];

export const servicesList = [
  {
    key: 'Mechanic',
    label: 'Mechanic',
  },
  {
    key: 'Electrician',
    label: 'Electrician',
  },
  {
    key: 'Tailoring',
    label: 'Tailoring',
  },
  {
    key: 'Driving',
    label: 'Driving',
  },
  {
    key: 'Bricklaying',
    label: 'Bricklaying',
  },
  {
    key: 'Plumbing',
    label: 'Plumbing',
  },
  {
    key: 'Cleaner',
    label: 'Cleaner',
  },
  {
    key: 'Gardener',
    label: 'Gardener',
  },
  {
    key: 'Hair Dressing',
    label: 'Hair Dressing',
  },
  {
    key: 'Medical Assistance',
    label: 'Medical Assistance',
  },
];

export const genderList = [
  {
    key: 'Male',
    label: 'Male',
  },
  {
    key: 'Female',
    label: 'Female',
  },
];

export const iDList = [
  {
    key: 'drivers-license',
    label: 'Drivers License',
  },
  {
    key: 'nin',
    label: 'National Identification Number',
  },
  {
    key: 'pvc',
    label: 'Permanent Voters Card',
  },
];

export const bankList = [
  {
    key: 'GTB',
    label: 'Guaranty Trust Bank',
  },
  {
    key: 'UBA',
    label: 'United Bank of Africa',
  },
];

export const states: { [key: string]: { name: string; state_code: string }[] } =
  {
    Nigeria: [
      { name: 'Abia State', state_code: 'AB' },
      { name: 'Adamawa State', state_code: 'AD' },
      { name: 'Akwa Ibom State', state_code: 'AK' },
      { name: 'Anambra State', state_code: 'AN' },
      { name: 'Bauchi State', state_code: 'BA' },
      { name: 'Bayelsa State', state_code: 'BY' },
      { name: 'Benue State', state_code: 'BE' },
      { name: 'Borno State', state_code: 'BO' },
      { name: 'Cross River State', state_code: 'CR' },
      { name: 'Delta State', state_code: 'DE' },
      { name: 'Ebonyi State', state_code: 'EB' },
      { name: 'Edo State', state_code: 'ED' },
      { name: 'Ekiti State', state_code: 'EK' },
      { name: 'Enugu State', state_code: 'EN' },
      { name: 'Federal Capital Territory', state_code: 'FC' },
      { name: 'Gombe State', state_code: 'GO' },
      { name: 'Imo State', state_code: 'IM' },
      { name: 'Jigawa State', state_code: 'JI' },
      { name: 'Kaduna State', state_code: 'KD' },
      { name: 'Kano State', state_code: 'KN' },
      { name: 'Katsina State', state_code: 'KT' },
      { name: 'Kebbi State', state_code: 'KE' },
      { name: 'Kogi State', state_code: 'KO' },
      { name: 'Kwara State', state_code: 'KW' },
      { name: 'Lagos State', state_code: 'LA' },
      { name: 'Nasarawa State', state_code: 'NA' },
      { name: 'Niger State', state_code: 'NI' },
      { name: 'Ogun State', state_code: 'OG' },
      { name: 'Ondo State', state_code: 'ON' },
      { name: 'Osun State', state_code: 'OS' },
      { name: 'Oyo State', state_code: 'OY' },
      { name: 'Plateau State', state_code: 'PL' },
      { name: 'Sokoto State', state_code: 'SO' },
      { name: 'Taraba State', state_code: 'TA' },
      { name: 'Yobe State', state_code: 'YO' },
      { name: 'Zamfara State', state_code: 'ZA' },
    ],
  };
export const tabs = [
  { id: 'new', label: 'New requests' },
  { id: 'ongoing', label: 'Ongoing help' },
  { id: 'completed', label: 'Completed help' },
] as const;

export const requstFormList = [
  {
    type: 'select',
    name: 'service',
    label: 'What type of help do you need?',
    placeholder: 'Choose help',
    options: servicesList || [],
  },
  {
    type: 'input',
    name: 'title',
    label: 'Request title',
    placeholder: 'Request title',
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Describe your request',
    placeholder: 'Describe your request',
  },
  {
    type: 'input',
    name: 'duration',
    label: 'How long do you need help for?',
    placeholder: '1 month',
  },
  {
    type: 'calender',
    name: 'start',
    label: 'Start date',
    placeholder: 'Start date',
  },

  {
    type: 'input',
    name: 'location',
    label: 'Where do you need this help?',
    placeholder: 'Where do you need this help?',
  },
  {
    type: 'input',
    name: 'price',
    label: 'How much will you pay',
    placeholder: 'How much will you pay',
    amount: true,
  },
];

const toolbarOptions = [
  [{ list: 'bullet' }], // Lists
  [{ header: [false] }], // Headers
];

export const modules = {
  toolbar: toolbarOptions,
};

export const tabList = [
  {
    key: 'details',
    label: 'Request Details',
  },
  {
    key: 'profile',
    label: 'Request Profile',
  },
  {
    key: 'reviews',
    label: 'Requester Review',
  },
  {
    key: 'biding',
    label: 'Biding Offer',
  },
];

export const profileList = [
  {
    key: 'details',
    label: 'Personal Details',
  },
  {
    key: 'work',
    label: 'Experience',
  },
  {
    key: 'verification',
    label: 'Identity',
  },
  {
    key: 'payment',
    label: 'Payment details',
  },
  {
    key: 'reviews',
    label: 'Reviews',
  },
];

export const offertabList = [
  {
    key: 'details',
    label: 'Offer details',
  },
  {
    key: 'profile',
    label: 'Helper Profile',
  },
  {
    key: 'reviews',
    label: 'Helper Review',
  },
];
