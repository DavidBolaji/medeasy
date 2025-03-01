import { mergeTypes, z } from 'zod';

//------------------------------------------------------------------------------
// Base signup schemas
//------------------------------------------------------------------------------

// Schema for initial signup with email and password
export const signUpOneSchemaBase = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string(),
  confirm_password: z.string(),
});

// Add password confirmation validation
export const signUpOneSchema = signUpOneSchemaBase.refine(
  (data) => data.password === data.confirm_password,
  {
    message: 'Passwords must match',
    path: ['confirm_password'],
  }
);

export type SignUpOneSchemaType = z.infer<typeof signUpOneSchema>;

//------------------------------------------------------------------------------
// Personal Information Schema
//------------------------------------------------------------------------------

export const signUpTwoSchema = z.object({
  fname: z.string().min(1, { message: 'First name field is required' }),
  lname: z.string().min(1, { message: 'Last name field is required' }),
  gender: z.enum(['Male', 'Female']),
  dob: z.string().min(1, { message: 'Date of birth field is required' }),
  language: z.string().min(1, { message: 'Language field is required' }),
});

export type SignUpTwoSchemaType = z.infer<typeof signUpTwoSchema>;

//------------------------------------------------------------------------------
// Professional Information Schema
//------------------------------------------------------------------------------

// Base schema for professional details
export const signUpThreeSchemaBase = z.object({
  services: z
    .array(
      z.object({
        name: z.string().min(1, 'Service name is required'),
        experience: z.string().min(1, 'Service experience is required'),
        duration: z
          .string()
          .regex(/^\d+$/, { message: 'Experience length must be a number' }),
      })
    )
    .nonempty({ message: 'At least one service is required' }),
  cv: z.string().url({ message: 'Invalid CV URL' }),
  medical: z.enum(['Yes', 'No']),
  certifications: z.array(
    z.object({
      certificate: z.string().optional(),
      name: z.string().optional(),
    })
  ),
});

// Enhanced schema with medical certification validations
export const signUpThreeSchema = signUpThreeSchemaBase
  // Validate at least one certification exists for medical professionals
  .refine(
    (data) => {
      if (data.medical === 'Yes') {
        const newCert = data.certifications.filter(
          (el) => typeof el.name !== 'undefined'
        );
        return newCert && newCert.length > 0;
      } else {
        return true;
      }
    },
    {
      message:
        'At least one certification is required for medically trained professionals',
      path: ['certifications'],
    }
  )
  // Validate no empty certification fields
  .refine(
    (data) => {
      if (data.medical === 'Yes') {
        const newCert = data.certifications.some(
          (el) => el.name === '' || el.certificate === ''
        );

        return !newCert;
      } else {
        return true;
      }
    },
    {
      message:
        'All name and certificate field are required for medically trained professionals',
      path: ['certifications'],
    }
  )
  // Validate no undefined certification fields
  .refine(
    (data) => {
      if (data.medical === 'Yes') {
        console.log('[certi]', data.certifications);
        const newCert = data.certifications.some(
          (el) =>
            typeof el.name === 'undefined' ||
            typeof el.certificate === 'undefined'
        );
        console.log('[NEWCERT]', newCert);
        return !newCert;
      } else {
        return true;
      }
    },
    {
      message:
        'All name and certificate field are required for medically trained professionals',
      path: ['certifications'],
    }
  );

export type SignUpThreeSchemaType = z.infer<typeof signUpThreeSchema>;

//------------------------------------------------------------------------------
// Identity Verification Schema
//------------------------------------------------------------------------------

export const signUpFourSchema = z.object({
  type: z.string().min(1, { message: 'Id type field is required' }),
  no: z.string().min(1, { message: 'Id no field is required' }),
  doc: z.string().url({ message: 'Invalid URL' }),
  expiry: z.string().min(1, { message: 'Expiry field is required' }),
  // verified: z.boolean().default(false),
});

export type SignUpFourSchemaType = z.infer<typeof signUpFourSchema>;

//------------------------------------------------------------------------------
// Banking Information Schema
//------------------------------------------------------------------------------

export const signUpFiveSchema = z.object({
  bank: z.string().min(1, { message: 'Bank field is required' }),
  actNo: z.string().min(1, { message: 'Account no field is required' }),
  role: z.enum(['AccountOwner', 'HelpProvider']),
  actVerified: z.boolean().default(false),
  verifiedName: z.string(),
});

export type SignUpFiveSchemaType = z.infer<typeof signUpFiveSchema>;

//------------------------------------------------------------------------------
// Service Related Schemas
//------------------------------------------------------------------------------

// Schema for service providers
export const serviceSchema = z.object({
  services: z
    .array(
      z.object({
        name: z.string().min(1, 'Service name is required'),
        experience: z.string().min(1, 'Service experience is required'),
        duration: z
          .string()
          .regex(/^\d+$/, { message: 'Experience length must be a number' }),
      })
    )
    .nonempty({ message: 'At least one service is required' }),
});

export type ServiceSchemaType = z.infer<typeof serviceSchema>;

export const servicewithoutFormSchema = z
  .array(
    z.object({
      name: z.string().min(1, 'Service name is required'),
      experience: z.string().min(1, 'Service experience is required'),
      duration: z
        .string()
        .regex(/^\d+$/, { message: 'Experience length must be a number' }),
    })
  )
  .nonempty({ message: 'At least one service is required' });

export type ServiceWithoutFormSchemaType = z.infer<
  typeof servicewithoutFormSchema
>;

// Base schema for work/professional details
export const worSchema = z.object({
  cv: z.string().url({ message: 'Invalid CV URL' }),
  medical: z.enum(['Yes', 'No']),
  certifications: z.array(
    z.object({
      certificate: z.string().optional(),
      name: z.string().optional(),
    })
  ),
});

// Enhanced work schema with medical certification validations
export const workSchema = worSchema
  .refine(
    (data) => {
      // if medical is yes make field compulsory
      if (data.medical === 'Yes') {
        const newCert = data.certifications.filter(
          (el) => typeof el.name !== 'undefined'
        );
        return newCert && newCert.length > 0;
      } else {
        return true;
      }
    },
    {
      message:
        'At least one certification is required for medically trained professionals',
      path: ['certifications'],
    }
  )
  .refine(
    (data) => {
      // if medical is yes do not allow field wth empty value
      if (data.medical === 'Yes') {
        const newCert = data.certifications.some(
          (el) => el.name === '' || el.certificate === ''
        );
        return !newCert;
      } else {
        return true;
      }
    },
    {
      message:
        'All name and certificate field are required for medically trained professionals',
      path: ['certifications'],
    }
  )
  .refine(
    (data) => {
      // if medical is yes do not allow field with value of undefined
      if (data.medical === 'Yes') {
        const newCert = data.certifications.some(
          (el) =>
            typeof el.name === 'undefined' ||
            typeof el.certificate === 'undefined'
        );
        return !newCert;
      } else {
        return true;
      }
    },
    {
      message:
        'All name and certificate field are required for medically trained professionals',
      path: ['certifications'],
    }
  );

export type WorkSchemaType = z.infer<typeof workSchema>;

//------------------------------------------------------------------------------
// Address Schema
//------------------------------------------------------------------------------

export const signUpAddressSchema = z.object({
  country: z.string().min(1, { message: 'Country field is required' }),
  state: z.string().min(1, { message: 'State no field is required' }),
  street: z.string().min(1, { message: 'Street field isrequied' }),
  other: z.string().optional(),
  address: z.string().min(1, { message: 'Address field isrequied' }),
});

export type SignUpAddressSchemaType = z.infer<typeof signUpAddressSchema>;

//------------------------------------------------------------------------------
// Combined Schema Types
//------------------------------------------------------------------------------

// Type for complete help provider signup
export type allSignUpSchemaType = mergeTypes<
  mergeTypes<
    mergeTypes<SignUpTwoSchemaType, SignUpThreeSchemaType>,
    SignUpFiveSchemaType
  >,
  mergeTypes<
    Omit<SignUpOneSchemaType, 'confirm_password'>,
    SignUpFourSchemaType
  >
>;

// Remove confirm_password from base schema
const signUpOneSchemaWithoutConfirm = signUpOneSchemaBase.omit({
  confirm_password: true,
});

export type PersonalDetailsWithRequestCount = SignUpTwoSchemaType & {
  completedRequests: number;
};

// Complete help provider signup schema
export const allSignUpSchema = signUpOneSchemaWithoutConfirm
  .merge(signUpTwoSchema)
  .merge(signUpThreeSchemaBase)
  .merge(signUpFourSchema)
  .merge(signUpFiveSchema);

// Type for complete account owner signup
export type allSignUppAccountOwnerSchemaType = mergeTypes<
  mergeTypes<SignUpTwoSchemaType, SignUpAddressSchemaType>,
  mergeTypes<
    Omit<SignUpOneSchemaType, 'confirm_password'>,
    SignUpFourSchemaType
  >
>;

// Complete account owner signup schema
export const allSignUpAccountOwnerSchema = signUpOneSchemaWithoutConfirm
  .merge(signUpTwoSchema)
  .merge(signUpAddressSchema)
  .merge(signUpFourSchema);
